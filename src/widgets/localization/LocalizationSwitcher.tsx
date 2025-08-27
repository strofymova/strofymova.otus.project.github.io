import React, { useContext } from 'react';
import { Locale } from './settings';
import style from './localization_switcher.module.css';
import { LocaleContext } from './LocalizationProvider';

const LocalizationSwitcher: React.FC = () => {
  const { locale, handleSwitchLocale } = useContext(LocaleContext);

  const handleChangeLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const array = Object.values(Locale);
    for (let i = 0; i < array.length; i++) {
      if (array[i] === e.target.value) {
        handleSwitchLocale(array[i]);
        break;
      }
    }
  };

  return (
    <select className={style.main} value={locale} onChange={handleChangeLocale}>
      <option value={Locale.en}>English</option>
      <option value={Locale.ru}>Русский</option>
    </select>
  );
};
export default LocalizationSwitcher;
