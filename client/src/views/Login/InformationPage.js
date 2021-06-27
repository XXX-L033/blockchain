import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';

import {Typography, Layout, Steps} from 'antd';

const {Header, Content} = Layout;
const {Step} = Steps;
const {Title} = Typography;


class InformationPage extends Component {
    render() {
        return (
            <Layout>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{padding: 0}}/>
                    <Content style={{margin: '24px 16px 0'}}>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 488}}>
                            <Title style={{fontWeight: 'bold', fontSize: 40}}>Welcome to the Green bond Trading
                                platform</Title>
                            <br/>
                            <Title style={{fontWeight: 'bold', fontSize: 25, textAlign: 'left'}}> What you can do
                                here:</Title>
                            <Steps direction="vertical" current={3}>
                                <Step title="Issue" description="Issuer fill the green bond form"/>
                                <Step title="Check" description="
                                    Financial regulator check the bond"/>
                                <Step title="Purchase" description="Investor purchase the bond"/>
                                <Step title="Mature" description="Investor gets money at maturity date"/>
                            </Steps>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default InformationPage;


