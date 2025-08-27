import { clsx } from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { NavLinkProps } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LocalizationSwitcher from '../localization/LocalizationSwitcher';
import Logo from '../logo/Logo';
import ThemeToggleButton from '../theme/ThemeToggleButton';
import styles from './header.module.css';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';
import { RootState } from '../../store';
import { tokenSelectors } from '../../store/token';

export const getClassName: NavLinkProps['className'] = ({ isActive }) => clsx(styles.link, isActive && styles.active);

export function Header(): React.ReactNode {
  const { t } = useTranslation();

  const styleName = useThemeStyles(styles.main, {
    light: styles.light,
    dark: styles.dark,
  });

  const token = useSelector<RootState, RootState['token']>(tokenSelectors.get);
  const isAuth = token != null && token != undefined;

  return (
    <div className={styleName}>
      <div className={styles.base}>
        <Logo />
        <LocalizationSwitcher />
        <ThemeToggleButton />
      </div>
      <div className={styles.navigation}>
        <NavLink className={getClassName} to="/">
          {t('screens.main')}
        </NavLink>
        <NavLink className={getClassName} to="/basket">
          {t('screens.basket.title')}
        </NavLink>
        {!isAuth && (
          <NavLink className={getClassName} to="/auth">
            {t('screens.auth.authTitle')}
          </NavLink>
        )}
        {isAuth && (
          <NavLink className={getClassName} to="/profile">
            {t('screens.profile.title')}
          </NavLink>
        )}
      </div>
    </div>
  );
}
export default Header;
