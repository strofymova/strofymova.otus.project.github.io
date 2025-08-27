import { clsx } from 'clsx';
import React, { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './filter_layout.module.css';
import { SortingInput } from '../../entities/base.types';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';

interface IFilterState {
  visibility: boolean;
  sorting: SortingInput;
  onChangeSort: (sorting: SortingInput) => void;
}

interface IFilterLayoutProps {
  initialVisibility?: boolean;
  sorting: SortingInput;
  onChangeSort: (sorting: SortingInput) => void;
}

const FilterLayout = forwardRef<HTMLDivElement, IFilterLayoutProps>(
  ({ initialVisibility = false, sorting, onChangeSort }, ref) => {
    const [state, setState] = useState<IFilterState>({
      visibility: initialVisibility,
      sorting: sorting,
      onChangeSort: onChangeSort,
    });
    const { t } = useTranslation();
    const mainStyle = useThemeStyles(styles.main, {
      light: styles.light,
      dark: styles.dark,
    });

    const [styleName, setStyleName] = useState<string>(styles.hide);

    useEffect(() => {
      setStyleName(state.visibility ? styles.show : styles.hide);
    }, [state.visibility]);

    const handleOnHoverEnter = () => {
      setState((prev) => ({ ...prev, visibility: true }));
    };

    const handleOnHoverLeave = () => {
      setState((prev) => ({ ...prev, visibility: false }));
    };

    return (
      <div
        ref={ref}
        className={clsx(mainStyle, styleName)}
        onMouseEnter={handleOnHoverEnter}
        onMouseLeave={handleOnHoverLeave}
      >
        {state.visibility && (
          <div className={styles.select}>
            <span className={styles.select_title}>{t('widgets.selectSort')}</span>
            <select
              value={`${sorting.type}`}
              onChange={(e) => {
                onChangeSort({ ...sorting, type: e.target.value as 'ASC' | 'DESC' });
              }}
            >
              <option value="ASC">Name A-Z</option>
              <option value="DESC">Name Z-A</option>
            </select>
          </div>
        )}
      </div>
    );
  }
);
FilterLayout.displayName = 'FilterLayout';
export default FilterLayout;
