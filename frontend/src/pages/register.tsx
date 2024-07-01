import React, { ChangeEvent, useState } from 'react';
import { Form, Layout } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import ButtonComponent from '../components/Button';
import { InputComponent } from '../components/Input';
import { postRegisterApi } from '../api/auth';
import { CreateUserDto } from '../../../backend/src/users/dto/create-user.dto';
import { useNavigate } from 'react-router-dom';
import { setSessionItem } from '../utils/sessionStorage';
import './pages.css';

const { Content } = Layout;

const Register: React.FC = () => {
    const navigate = useNavigate();

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

    const handleSubmit = async (values: CreateUserDto) => {
        try {
            const response = await postRegisterApi(values);
            console.log('User registered:', response.data);
            setSessionItem('user', values);
            handleNavigation('/');
        } catch (error) {
            console.log('Error registering user:', error);
        }
    };

    const handleNavigation = (url: string) => {
        navigate(url);
    };

    return (
        <Layout className="register-form-container">
            <Content>
                <Form
                    className="register-form"
                    initialValues={user}
                    onFinish={handleSubmit}
                >
                    <div className="form-item-container">
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
                                className="custom-input"
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
                                className="custom-input"
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
                                className="custom-input"
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
                                className="custom-input"
                            />
                        </Form.Item>
                    </div>
                    <ButtonComponent type="primary" htmlType="submit" className="register-form-btn">
                        Submit
                    </ButtonComponent>
                </Form>
            </Content>
        </Layout>
    );
};

export default Register;