
import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

interface CustomButtonProps extends ButtonProps{
  
}

const ButtonComponent: React.FC<CustomButtonProps> = ({...props }) => {
  return (
    <Button 
    {...props}>
    </Button>
  );
};

export default ButtonComponent;