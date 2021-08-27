import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';

import {Typography, Layout} from 'antd';
import getWeb3 from "../../getWeb3";

const {Header, Content} = Layout;
const {Title} = Typography;

class IssueSuccess extends Component {

    render() {
        return (
            <Layout>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{padding: 0}}/>
                    <Content>
                        <div className="site-layout-background" style={{padding: '10px'}}>
                            <Title style={{fontSize: 30, textAlign: 'left'}}>Success !</Title>
                            <Title style={{fontSize: 17, textAlign: 'left'}}>Your application has been submitted to <b>Financial Regulator</b> and <b>Green Feature Verifier</b>, bond will be issued if they meet the requirement.</Title>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default IssueSuccess;
