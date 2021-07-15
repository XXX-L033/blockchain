import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import {Link, Route} from "react-router-dom";

import {Tooltip, Typography, Button, Form, Layout, Steps, Checkbox, Input} from 'antd';
import {LockOutlined, WalletOutlined, EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined} from '@ant-design/icons';
import getWeb3 from "../../getWeb3";
import SimpleStorageContract from "../../contracts/LoanContract.json";
import BondDisplay from "../BondPurchase/BondDisplay";

const {Header, Content} = Layout;
const {Title} = Typography;

const route = {
    path:`/BondPurchase/BondDisplay`,
    component:BondDisplay,
}

const onFinish = (values) => {
    console.log('Received values from investor', values);
    const jumpForm4 = document.createElement('form');
    document.body.appendChild(jumpForm4);
    jumpForm4.action = `/BondPurchase/BondDisplay`;
    jumpForm4.submit();
};

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


class InvestorLogin extends Component{
    state = {storageValue: 0, web3: null, accounts: null, contract: null};


    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({web3, accounts, contract: instance}, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    render() {
        return (
            <Layout>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{padding: 0}}/>
                    <Content>
                        <div className="site-layout-background" style={{padding: '10px'}}>
                            <Title style={{fontWeight: 'bold', fontSize: 40, textAlign: 'center'}}>Investor Login</Title>
                            <br/>
                            <Route exact path={route.path} component={route.component}/>
                            <Form
                                {...formItemLayout}
                                name="issuerLogin"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                size="large"
                            >
                                <Form.Item
                                    label="Wallet Address"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your address!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<WalletOutlined className="wallet-address"/>}
                                           suffix={
                                               <Tooltip title="Enter your MetaMask wallet address">
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
                                    <br />
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
export default InvestorLogin;

