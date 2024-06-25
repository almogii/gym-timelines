import React, { ChangeEvent, FormEvent, useState } from 'react';
import ButtonComponent from '../components/Button'
import {InputComponent} from '../components/Input'
import {Form} from 'antd'
import {postRegisterApi} from '../api/auth'
import {CreateUserDto} from '../../../backend/src/users/dto/create-user.dto'
import { LockOutlined, UserOutlined } from '@ant-design/icons';


const Register: React.FC = () => {
  const [user, setUserDetails] = useState<CreateUserDto>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // const response = await apiService.post('/users', user);
      const response= await postRegisterApi(user)
      console.log('User registered:', response.data);
      
    } catch (error) {
      console.log('Error registering user:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <Form 
    className='register-form'
    initialValues={{remember:true}}
    onFinish={handleSubmit}>
    <Form.Item name='first name' rules={[{required:true,message:'please input your First name'}]}>
      <InputComponent onChange={handleChange} prefix={<UserOutlined className='site-form-item-icon'/>} placeholderText={'First name'}/>
    </Form.Item>
    <Form.Item name='family name' rules={[{required:true,message:'please input your family name'}]}>
      <InputComponent onChange={handleChange} prefix={<UserOutlined className='site-form-item-icon'/>} placeholderText={'family name'}/>
    </Form.Item>
    <Form.Item name='email' rules={[{required:true,message:'please input your email'}]}>
      <InputComponent onChange={handleChange} prefix={<UserOutlined className='site-form-item-icon'/>} placeholderText={'example: aaa@gmail.com'}/>
    </Form.Item>
    <Form.Item name='password' rules={[{required:true,message:'Please input your Password!'}]}>
      <InputComponent onChange={handleChange} prefix={<LockOutlined  className='site-form-item-icon'/>} placeholderText={'password'} type='password'/>
    </Form.Item>
    <ButtonComponent type='primary' htmlType='submit' className='register-form-btn'>Submit</ButtonComponent>
    </Form>
  );
};

export default Register;