import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import {Layout, Tabs} from "antd";
import IssuePage from "./IssuePage";
import StateCheck from "./StateCheck";

const {Header} = Layout;
const {TabPane} = Tabs;

class BondIssue extends Component {
    render() {
        return (
            <Layout>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{padding: 0}}/>
                    <Tabs defaultActiveKey="state" style={{padding: 10}}>
                        <TabPane tab="Check State" key="state">
                            <StateCheck/>
                        </TabPane>
                        <TabPane tab="Issue Bond" key="issue" >
                            <IssuePage/>
                        </TabPane>
                    </Tabs>
                </Layout>
            </Layout>
        );
    }
}

export default BondIssue;
