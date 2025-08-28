import React from 'react';
import Layout from '../../widgets/layout/Layout';
import SingInBlock from '../../widgets/auth/sign_in_block/SingInBlock';
import styles from './auth.module.css';
import { useLocation } from 'react-router-dom';
import SingUp from '../../widgets/auth/SignUp';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';

const Auth: React.FC = React.memo(() => {
  const styleName = useThemeStyles(styles.main, {
    light: styles.light,
    dark: styles.dark,
  });
  const location = useLocation();
  const showSignUp = location.pathname.includes('/signUp');
  return (
    <>
      <Layout>
        <SingInBlock className={styleName} />
      </Layout>
      {showSignUp && <SingUp />}
    </>
  );
});
Auth.displayName = 'Auth';
export default Auth;
