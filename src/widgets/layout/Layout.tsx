import React from 'react';
import styles from './layout.module.css';
import Header from '../header/Header';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';

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
