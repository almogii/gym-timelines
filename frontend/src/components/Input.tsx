import React from 'react';
import { Input, InputProps } from 'antd';

interface CustomInputProps extends InputProps {
  placeholderText: string;
}

export const InputComponent: React.FC<CustomInputProps> = ({ placeholderText, ...props }) => {
  return <Input placeholder={placeholderText} {...props} />;
};