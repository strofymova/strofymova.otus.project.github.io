import React, { useCallback, useState } from 'react';
import { clsx } from 'clsx';
import style from './basket_button_widget.module.css';
import { useTranslation } from 'react-i18next';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';

const getDecrement = (count: number) => Math.max(0, count - 1);
const getIncrement = (count: number) => count + 1;

interface IBasketProps {
  initCount: number;
  disabled: boolean;
  className?: string;
  handleIncrement?: (count: number) => void;
  handleDecrement?: (count: number) => void;
}

interface IBasketButtonProps {
  disabled: boolean;
  onClick(): void;
}

interface IBasketCounterComponentProps {
  count: number;
  onClickIncrement(): void;
  onClickDecrement(): void;
}

function BasketButton({ disabled, onClick }: IBasketButtonProps) {
  const { t } = useTranslation();
  const styleName = useThemeStyles(clsx(style.basket_btn, style.base_btn), {
    light: style.light,
    dark: style.dark,
  });
  return (
    <button className={styleName} disabled={disabled} onClick={onClick}>
      {t('widgets.basket.add')}
    </button>
  );
}

function BasketCounterComponent({ count, onClickIncrement, onClickDecrement }: IBasketCounterComponentProps) {
  const styleName = useThemeStyles(clsx(style.counter_btn, style.base_btn), {
    light: style.light,
    dark: style.dark,
  });
  return (
    <>
      <button className={styleName} onClick={onClickDecrement}>
        -
      </button>
      <input className={style.count_input} disabled value={count} />
      <button className={styleName} onClick={onClickIncrement}>
        +
      </button>
    </>
  );
}

export function BasketButtonWidget({ initCount, disabled, className, handleIncrement, handleDecrement }: IBasketProps) {
  const [count, setCount] = useState(initCount);
  React.useEffect(() => {
    setCount(initCount);
  }, [initCount]);

  const _handleIncrement = useCallback(() => {
    setCount((prevCount) => {
      const newCount = getIncrement(prevCount);
      handleIncrement?.(newCount);
      return newCount;
    });
  }, [handleIncrement]);

  const _handleDecrement = useCallback(() => {
    setCount((prevCount) => {
      const newCount = getDecrement(prevCount);
      handleDecrement?.(newCount);
      return newCount;
    });
  }, [handleDecrement]);
  return (
    <div className={clsx(className, style.main)}>
      {count === 0 ? (
        <BasketButton onClick={_handleIncrement} disabled={disabled} />
      ) : (
        <BasketCounterComponent count={count} onClickIncrement={_handleIncrement} onClickDecrement={_handleDecrement} />
      )}
    </div>
  );
}

export default BasketButtonWidget;
