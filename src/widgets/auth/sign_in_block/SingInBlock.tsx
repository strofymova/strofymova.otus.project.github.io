import React, { memo, ReactNode, useMemo } from 'react';
import cn from 'clsx';
import { useMutation } from '@apollo/client';
import type { FormikConfig } from 'formik';
import { useFormik } from 'formik';
import { Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import s from './sing_in_block.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutingState } from '../../../routing/Routing';
import { AuthFormErrors, AuthFormValues } from '../auth_form/types';
import { extractSignIn, SIGN_IN, SignInResponse, SignInVars } from '../../../shared/graphql/profile/mutations';
import { createErrorHandlers } from '../../../shared/helpers/createErrorHandlers';
import { tokenActions } from '../../../store/token';
import { profileActions } from '../../../store/profile';
import { isLongEnough, isNotDefinedString } from '../../../shared/helpers/validation';
import AuthForm from '../auth_form/AuthForm';

export type SingInBlockProps = {
  className?: string;
};

const initialValues: AuthFormValues = {
  email: undefined,
  password: undefined,
};

interface ISignUpButtonProps {
  handleOnClickSignUp: () => void;
  title: string;
}
function SignUpButton({ handleOnClickSignUp, title }: ISignUpButtonProps): ReactNode {
  return (
    <Button className={s.signUpBtn} type="primary" onClick={handleOnClickSignUp}>
      {title}
    </Button>
  );
}

export const SingInBlock = memo<SingInBlockProps>(({ className }: SingInBlockProps) => {
  const { t } = useTranslation();
  const [signIn, { loading }] = useMutation<SignInResponse, SignInVars>(SIGN_IN, { fetchPolicy: 'no-cache' });
  const dispatch = useDispatch();

  const { onSubmit, validate } = useMemo<Pick<FormikConfig<AuthFormValues>, 'onSubmit' | 'validate'>>(() => {
    const { catcher } = createErrorHandlers((code, _, error) => {
      if (code === null) {
        message.error(t(`errors.${error.message}`));
      } else {
        message.error(t(`errors.${code}`));
      }
    });
    return {
      onSubmit: (values, { resetForm }) => {
        console.log('Submit values: ', JSON.stringify(values));
        signIn({ variables: { email: values.email, password: values.password } })
          .then((res) => {
            const result = extractSignIn(res.data);
            if (result) {
              dispatch(tokenActions.set(result.token));
              dispatch(profileActions.set(result.profile));
            }
            resetForm();
          })
          .catch(catcher);
      },
      validate: (values) => {
        const errors = {} as AuthFormErrors;
        if (isNotDefinedString(values.email)) {
          errors.email = t(`errors.is_required`);
        }
        if (isNotDefinedString(values.password)) {
          errors.password = t(`errors.is_required`);
        } else if (!isLongEnough(values.password)) {
          errors.password = t(`errors.too_short_password`);
        }
        return errors;
      },
    };
  }, [dispatch, signIn, t]);

  const formik = useFormik<AuthFormValues>({
    onSubmit,
    initialValues,
    validate,
  });

  const { submitForm } = formik;

  const location = useLocation();
  const navigate = useNavigate();

  const handleOnClickSignUp = () => {
    const state: RoutingState = location.state;
    navigate(state?.from || '/signUp');
  };

  return (
    <div className={cn(s.root, className)}>
      <AuthForm formManager={formik} />
      <div className={s.bottom}>
        <Button className={s.submit} loading={loading} type="primary" onClick={submitForm}>
          {t(`screens.auth.signIn.submit`)}
        </Button>
        <SignUpButton handleOnClickSignUp={handleOnClickSignUp} title={t('widgets.authorization.signUp')} />
      </div>
    </div>
  );
});

SingInBlock.displayName = 'SingInBlock';
export default SingInBlock;
