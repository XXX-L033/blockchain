import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';

import {Tooltip, Typography, Button, Form, Layout, Steps, Checkbox, Input} from 'antd';
import {
    LockOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    InfoCircleOutlined,
    IdcardOutlined
} from '@ant-design/icons';
import CheckBond from '../BondChecking/CheckBond';
import {Route} from "react-router-dom";

const {Header, Content} = Layout;
const {Title} = Typography;

const formItemLayout = {

    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 10
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 3,
        span: 10,
    },
};

const buttonLayout = {
    wrapperCol: {
        offset: 3,
        span: 18,
    },
};

const route = {
    path: `/BondChecking/CheckBond`,
    component: CheckBond,
};

const onFinish = (values) =>{
    const jumpForm3 = document.createElement('form');
    document.body.appendChild(jumpForm3);
    jumpForm3.action = `/BondChecking/CheckBond`;
    jumpForm3.submit();
}

class RegulatorLoginLogin extends React.Component {
    render() {
        return (
            <Layout>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{padding: 0}}/>
                    <Content>
                        <div className="site-layout-background" style={{padding: '10px'}}>
                            <Title style={{fontWeight: 'bold', fontSize: 40, textAlign: 'center'}}>Financial Regulator
                                Login</Title>
                            <br/>
                            <Route exact path={route.path} component={route.component}/>
                            <Form
                                {...formItemLayout}
                                name="regulatorLogin"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                size="large"
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<IdcardOutlined className="wallet-address"/>}
                                           suffix={
                                               <Tooltip title="Enter your registered username">
                                                   <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                                               </Tooltip>
                                           }/>
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon"/>}
                                        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>

                                </Form.Item>
                                <Form.Item {...buttonLayout}>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                    <br/>
                                    Or <a href="">register now!</a>
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default RegulatorLoginLogin;



