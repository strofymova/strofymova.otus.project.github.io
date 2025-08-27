import React, { memo, useEffect, useMemo } from 'react';
import cn from 'clsx';
import { useFormik } from 'formik';
import type { FormikConfig } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { UPDATE_PROFILE, UpdateProfileResponse, UpdateProfileVars } from '../../../shared/graphql/profile/mutations';
import s from './profile_completed_form.module.css';
import { ProfileForm, ProfileFormErrors, ProfileFormValues } from '../profile_form';
import { GET_PROFILE, GetProfileResponse } from '../../../shared/graphql/profile/query';
import { profileActions, profileSelectors } from '../../../store/profile';
import { createErrorHandlers } from '../../../shared/helpers/createErrorHandlers';
import { isNotDefinedString } from '../../../shared/helpers/validation';
import { tokenActions } from '../../../store/token';

export type ProfileCompletedFormProps = {
  className?: string;
};

export const ProfileCompletedForm = memo<ProfileCompletedFormProps>(({ className }: ProfileCompletedFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading: profileLoading } = useQuery<GetProfileResponse>(GET_PROFILE, {
    onCompleted: (data) => {
      if (data.profile) {
        dispatch(profileActions.set(data.profile));
      }
    },
    onError: (error) => {
      message.error(t(`errors.${error.message}`));
    },
    fetchPolicy: 'network-only',
  });

  const profile = useSelector(profileSelectors.get);
  const [update, { loading: updateLoading }] = useMutation<UpdateProfileResponse, UpdateProfileVars>(UPDATE_PROFILE);

  const { onSubmit, validate, initialValues } = useMemo<
    Pick<FormikConfig<ProfileFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
  >(() => {
    const { catcherValidator } = createErrorHandlers<keyof ProfileFormValues>(
      (code, _, error) => {
        if (code === null) {
          message.error(t(`errors.${error.message}`));
        } else {
          message.error(t(`errors.${code}`));
        }
      },
      {
        name: ['ERR_INVALID_NICKNAME'],
      }
    );
    return {
      initialValues: {
        name: profile?.name,
        about: 'GraphQL test server not support save profile with "about"',
      },
      onSubmit: (values, { setErrors }) => {
        update({ variables: { input: { name: values.name } } })
          .then(() => message.success(t(`screens.profile.updateProfile.success`)))
          .catch(catcherValidator({ setErrors, getMessage: (code) => t(`errors.${code}`) }));
      },
      validate: (values) => {
        const errors = {} as ProfileFormErrors;
        if (isNotDefinedString(values.name)) {
          errors.name = t(`errors.is_required`);
        }
        return errors;
      },
    };
  }, [profile, t, update]);

  const formManager = useFormik<ProfileFormValues>({
    initialValues,
    onSubmit,
    validate,
    enableReinitialize: true,
  });
  const { submitForm, setValues } = formManager;

  useEffect(() => {
    setValues({ name: profile?.name, about: 'GraphQL test server not support save profile with "about"' });
  }, [profile, setValues]);

  const loading = updateLoading || profileLoading;

  const handleOnLoggout = () => {
    dispatch(tokenActions.logout());
  };

  return (
    <div className={cn(s.root, className)}>
      <ProfileForm formManager={formManager} />
      <Button type="primary" loading={loading} onClick={submitForm}>
        {t(`screens.profile.updateProfile.save`)}
      </Button>
      <Button type="primary" onClick={handleOnLoggout}>
        {t(`screens.profile.logout`)}
      </Button>
    </div>
  );
});

ProfileCompletedForm.displayName = 'ProfileCompletedForm';
