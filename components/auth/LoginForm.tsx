import React from 'react';
import styles from './Auth.module.scss';
import { Button, Form, Input } from 'antd';

export const LoginForm: React.FC = () => {
    const onSubmit = (values: any) => {
        console.log(values);
    };
    return (
        <div className={styles.formBlock}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                onFinish={onSubmit}>
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Укажите почту',
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Укажите пароль',
                        },
                    ]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}>
                    <Button type="primary" htmlType="submit">
                        {' '}
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
