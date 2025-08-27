import React from 'react';
import { Spin } from 'antd';
import styles from './custom_spin.module.css';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';

const CustomSpin: React.FC = (): React.ReactNode => {
  const styleName = useThemeStyles(styles.main, {
    light: styles.light,
    dark: styles.dark,
  });

  return <Spin className={styleName} size="large" />;
};
export default CustomSpin;
