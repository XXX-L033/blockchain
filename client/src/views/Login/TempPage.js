import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Steps, Tabs, Radio} from 'antd';
import { ClockCircleOutlined, IssuesCloseOutlined , UserOutlined, DiffOutlined, AlertOutlined  } from '@ant-design/icons';
import {Router} from 'react-router-dom';
import "../../App.css";
import logo from "../../image/logo.svg";
import InformationPage from "./InformationPage";
// import InvestorLogin from "./Login/InvestorLogin.js";
// import InformationPage from "./Login/InformationPage";

const { Header, Content, Sider } = Layout;
const {Step} = Steps;
const {TabPane} = Tabs

const contractAddress = "0x820dBe747a3DD3854380c73D4861E039000b24F5";
var loanContract;


function TempPage(){
    function callback(key) {
        console.log(key);
    }

    const Demo = () => (
        <Tabs defaultActiveKey="1" tabPosition="left" >
            <TabPane tab="Information" key="1">
                <InformationPage/>
            </TabPane>
            <TabPane  tab="Issuer Login" key="2">
                Issuer Login
            </TabPane>
            <TabPane  tab="Investor Login" key="3" >
                Investor Login
            </TabPane>
            <TabPane  tab={<span style={{color:"#FFFFFF"}}>Regulator Login</span>} key="4" >
                Investor Login
            </TabPane>
        </Tabs>
    );

    return (
        <Layout>
            {/*<Sider*/}
            {/*    breakpoint="lg"*/}
            {/*    collapsedWidth="0"*/}
            {/*    onBreakpoint={broken => {*/}
            {/*        console.log(broken);*/}
            {/*    }}*/}
            {/*    onCollapse={(collapsed, type) => {*/}
            {/*        console.log(collapsed, type);*/}
            {/*    }}*/}
            {/*>*/}
                <div className="Logo" />
                <Header className="logoPic">
                    <img
                        alt="LOGO"
                        width={120}
                        src={logo}
                    />
                </Header>
            {/*</Sider>*/}
                <Demo/>


            <Layout>
                <Header className="information-page-layout" style={{ padding: 0 }} />
            </Layout>
        </Layout>
    );
}

export default TempPage;
