import React, { ReactNode } from 'react';
import style from './add_button.module.css';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { clsx } from 'clsx';
import { useThemeStyles } from '../../shared/hooks/useThemeStyles';

interface IAddButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
}
export const AddButton = ({ title, onClick, className }: IAddButtonProps): ReactNode => {
  const styleName = useThemeStyles(style.main, {
    light: style.light,
    dark: style.dark,
  });

  return (
    <div className={clsx(styleName, style.add_button, className)}>
      <div className={style.title}>{title}</div>
      <div className={style.add_content}>
        <Button
          className={style.add_btn}
          type="primary"
          icon={<PlusOutlined className={style.custom_icon} />}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
export default AddButton;
