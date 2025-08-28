import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';
import Modal from '../../widgets/modal/Modal';
import styles from './sign_up.module.css';
import SingUpBlock from './sign_up_block/SingUpBlock';

const SingUp: React.FC = () => {
  const { t } = useTranslation();
  const styleName = useThemeStyles(styles.main, {
    light: styles.light,
    dark: styles.dark,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  const handleOnCloseModal = () => {
    navigate(background?.pathname || '/auth', { state: { background: null } });
  };

  return (
    <Modal
      className={styles.modal}
      title={t('widgets.authorization.signUp')}
      visible={true}
      onClose={handleOnCloseModal}
    >
      <SingUpBlock className={styleName} />
    </Modal>
  );
};

export default SingUp;
