import React, { memo } from 'react';
import cn from 'clsx';
import { AuthFormProps } from './types';
import s from './auth_form.module.css';
import EmailField from './email_field/EmailField';
import PasswordField from './passwork_field/PasswordField';

export const AuthForm = memo<AuthFormProps>(
  ({ className, formManager, formElement, autoFocusElement, disabled }: AuthFormProps) => {
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange, submitForm } = formManager;

    return (
      <form ref={formElement} onSubmit={handleSubmit} className={cn(s.root, className)}>
        <EmailField
          onPressEnter={submitForm}
          autoFocusElement={autoFocusElement}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          errors={errors.email}
          submitCount={submitCount}
          touched={touched.email}
          disabled={disabled}
        />
        <PasswordField
          onPressEnter={submitForm}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          errors={errors.password}
          submitCount={submitCount}
          touched={touched.password}
          disabled={disabled}
        />
      </form>
    );
  }
);

AuthForm.displayName = 'AuthForm';
export default AuthForm;
