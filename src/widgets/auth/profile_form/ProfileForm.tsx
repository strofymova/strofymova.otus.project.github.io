import React, { memo } from 'react';
import cn from 'clsx';
import { ProfileFormProps } from './types';
import s from './profile_form.module.css';
import NameField from './name_field/NameField';
import AboutField from './about_field/AboutField';

export const ProfileForm = memo<ProfileFormProps>(
  ({ className, formManager, formElement, autoFocusElement, disabled }: ProfileFormProps) => {
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange } = formManager;

    return (
      <form ref={formElement} onSubmit={handleSubmit} className={cn(s.root, className)}>
        <NameField
          autoFocusElement={autoFocusElement}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          errors={errors.name}
          submitCount={submitCount}
          touched={touched.name}
          disabled={disabled}
        />
        <AboutField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.about}
          errors={errors.about}
          submitCount={submitCount}
          touched={touched.about}
          disabled={disabled}
        />
      </form>
    );
  }
);

ProfileForm.displayName = 'ProfileForm';
