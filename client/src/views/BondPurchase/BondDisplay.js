import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import {Layout, Tabs} from "antd";
import PurchasePage from "./PurchasePage";
import TransferPage from "./TransferPage";

const {Header} = Layout;
const {TabPane} = Tabs;

class BondDisplay extends Component {
    render() {
        return (
            <Layout>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{padding: 0}}/>
                    <Tabs defaultActiveKey="display" style={{padding: 10}}>
                        <TabPane tab="Bond Purchase" key="display" >
                            <PurchasePage/>
                        </TabPane>
                        <TabPane tab="Bond Transfer" key="transfer">
                            <TransferPage/>
                        </TabPane>
                    </Tabs>
                </Layout>
            </Layout>
        );
    }
}

export default BondDisplay;
