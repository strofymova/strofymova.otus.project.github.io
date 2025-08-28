import React from 'react';
import { ProfileCompletedForm } from '../../widgets/auth/profile_completed_form';
import Layout from '../../widgets/layout/Layout';
import styles from './settings.module.css';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';

const Settings: React.FC = React.memo(() => {
  const styleName = useThemeStyles(styles.profile, {
    light: styles.light,
    dark: styles.dark,
  });

  const styleNameBtn = useThemeStyles(styles.button, {
    light: styles.light,
    dark: styles.dark,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleOnClickBack = () => {
    navigate(-1);
  };
  return (
    <Layout>
      <ProfileCompletedForm className={styleName} />
      <Button className={styleNameBtn} type="primary" onClick={handleOnClickBack}>
        {' '}
        {t('widgets.back')}{' '}
      </Button>
    </Layout>
  );
});

Settings.displayName = 'Settings';
export default Settings;
