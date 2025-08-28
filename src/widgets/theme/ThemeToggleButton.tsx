import React, { useContext } from 'react';
import styles from './theme_toggle_button.module.css';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './ThemeProvider';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';

const ThemeToggleButton: React.FC = () => {
  const { handleSwitchTheme } = useContext(ThemeContext);
  const styleName = useThemeStyles(styles.main, {
    light: styles.light,
    dark: styles.dark,
  });

  const { t } = useTranslation();

  return (
    <button className={styleName} onClick={handleSwitchTheme}>
      {t('widgets.changeTheme')}
    </button>
  );
};

export default ThemeToggleButton;
