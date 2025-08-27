import React from 'react';
import Layout from '../../widgets/layout/Layout';
import styles from './profile.module.css';

import { SettingOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';

const Profile: React.FC = React.memo(() => {
  const styleName = useThemeStyles(styles.main, {
    light: styles.light,
    dark: styles.dark,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnClickOrders = () => {
    navigate(`/profile/orders`);
  };

  const handleOnClickSettings = () => {
    navigate(`/profile/settings`);
  };

  return (
    <Layout>
      <div className={styleName}>
        <Button
          className={styles.orders_btn}
          type="primary"
          icon={<ShoppingOutlined className={styles.custom_icon} />}
          onClick={handleOnClickOrders}
        >
          {' '}
          {t('widgets.profile.orders')}{' '}
        </Button>
        <Button
          className={styles.settings_btn}
          type="primary"
          icon={<SettingOutlined className={styles.custom_icon} />}
          onClick={handleOnClickSettings}
        >
          {' '}
          {t('widgets.profile.setting')}{' '}
        </Button>
      </div>
    </Layout>
  );
});

Profile.displayName = 'Profile';
export default Profile;
