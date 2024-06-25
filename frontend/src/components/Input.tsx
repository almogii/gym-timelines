import React from "react";
import {Input} from "antd";
import { InputProps } from 'antd/lib/input';



interface CustomInputProps extends InputProps {
    
    placeholderText: string;

  }

 export const InputComponent:React.FC<CustomInputProps> = ({placeholderText,...props})=>{

    return(<Input placeholder={placeholderText} 
        {...props}
    
    />)
  }



  