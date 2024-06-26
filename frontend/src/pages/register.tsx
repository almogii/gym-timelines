import React, { ChangeEvent, FormEvent, useState } from 'react';
import ButtonComponent from '../components/Button'
import {InputComponent} from '../components/Input'
import {Form} from 'antd'
import {postRegisterApi} from '../api/auth'
import {CreateUserDto} from '../../../backend/src/users/dto/create-user.dto'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'
import {setSessionItem} from '../utils/sessionStorage'
const Register: React.FC = () => {

  
  const navigate=useNavigate()

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

  const handleSubmit = async (values:CreateUserDto) => {
   
  
    try {
      // const response = await apiService.post('/users', user);
      const response= await postRegisterApi(values)
      console.log('User registered:', response.data);
      setSessionItem('user',values)
       handleNavigation('/')
      
      
    } catch (error) {
      console.log('Error registering user:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleNavigation = (url:string)=> {
    navigate(url)
  }

  return (
    <Form
      className="register-form"
      initialValues={user}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: 'Please input your First name' }]}
      >
        <InputComponent
          name="firstName"
          onChange={handleChange}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholderText="First name"
          value={user.firstName}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: 'Please input your Family name' }]}
      >
        <InputComponent
          name="lastName"
          onChange={handleChange}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholderText="Family name"
          value={user.lastName}
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email' }]}
      >
        <InputComponent
          name="email"
          onChange={handleChange}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholderText="example: aaa@gmail.com"
          value={user.email}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <InputComponent
          name="password"
          onChange={handleChange}
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholderText="Password"
          type="password"
          value={user.password}
        />
      </Form.Item>
      <ButtonComponent type="primary" htmlType="submit" className="register-form-btn">
        Submit
      </ButtonComponent>
    </Form>
  );
};

export default Register;