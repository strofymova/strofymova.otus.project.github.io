import React from 'react';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';
import Header from '../header/Header';
import styles from './layout.module.css';

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }: ILayoutProps) => {
  const styleName = useThemeStyles(styles.main, {
    light: styles.light,
    dark: styles.dark,
  });
  return (
    <div className={styleName}>
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
