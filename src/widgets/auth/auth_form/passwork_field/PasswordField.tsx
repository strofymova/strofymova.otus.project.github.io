import React, { memo } from 'react';
import cn from 'clsx';
import Input from 'antd/lib/input';
import type { FormikHandlers } from 'formik/dist/types';
import { LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import s from './password_field.module.css';
import { AuthFormProps } from '../types';
import { FormItem } from '../../form_item';
import { getValidates } from '../../../../shared/helpers/validation';

export type PasswordFieldProps = Pick<AuthFormProps, 'className' | 'disabled'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onPressEnter: () => void;
  onBlur: FormikHandlers['handleBlur'];
};

const prefix = <LockOutlined className="site-form-item-icon" />;

export const PasswordField = memo<PasswordFieldProps>(
  ({
    className,
    onChange,
    onBlur,
    onPressEnter,
    touched,
    value,
    errors,
    disabled,
    submitCount,
  }: PasswordFieldProps) => {
    const { t } = useTranslation();

    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem
        className={cn(s.root, className)}
        title={t(`forms.AuthForm.password.title`)}
        required
        validateStatus={validateStatus}
        help={help}
      >
        <Input.Password
          prefix={prefix}
          onPressEnter={onPressEnter}
          disabled={disabled}
          data-cy="input"
          name="password"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={t(`forms.AuthForm.password.placeholder`)}
        />
      </FormItem>
    );
  }
);

PasswordField.displayName = 'PasswordField';
export default PasswordField;
