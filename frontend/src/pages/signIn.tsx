import React, { ChangeEvent, useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Form } from "antd";
import { postLoginApi } from '../api/auth';
import { InputComponent } from "../components/Input";
import ButtonComponent from "../components/Button";
import { useNavigate } from 'react-router-dom';
import './pages.css';

const { Content } = Layout;

interface SignInUser {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const [signedUser, setSignedUser] = useState<SignInUser>({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignedUser({
            ...signedUser,
            [name]: value,
        });
        console.log(signedUser);
    };

    const handleNavigation = (url: string) => {
        navigate(url);
    };

    const handleSubmit = async (values: SignInUser) => {
        try {
            const response = await postLoginApi(values);
            console.log(response.data);

            if (values.password === signedUser.password) {
                sessionStorage.setItem('user', JSON.stringify(values));
                handleNavigation('/');
            }
        } catch (error) {
            console.log("There is no such email", error);
        }
    };

    return (
        <Layout className="signin-form-container">
            <Content>
                <Form 
                    className="signin-form"
                    initialValues={signedUser}
                    onFinish={handleSubmit}
                >
                    <div className="form-item-container">
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email' }]}
                        >
                            <InputComponent 
                                name="email"
                                onChange={handleChange}
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholderText="example: aaa@gmail.com"
                                value={signedUser.email}
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
                                value={signedUser.password}
                                className="custom-input" 
                            />
                        </Form.Item>
                    </div>
                    <ButtonComponent type="primary" htmlType="submit" className="signin-form-btn">
                        Submit
                    </ButtonComponent>
                </Form>
            </Content>
        </Layout>
    );
};

export default SignIn;