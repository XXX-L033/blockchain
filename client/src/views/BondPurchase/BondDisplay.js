import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import {Layout, Tabs} from "antd";
import PurchasePage from "./PurchasePage";
import TransferPage from "./TransferPage";
import BondState from "./BondState";
import getWeb3 from "../../getWeb3";
import LoanToken from "../../contracts/LoanToken.json";

const {Header} = Layout;
const {TabPane} = Tabs;
let web3 = null;
let loanInstance = null;


class BondDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3:null,
            loan:null,
            investor:null
        }
    }
    componentDidMount = async () =>{
        web3 = await getWeb3()
        const Id = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();
        const deployedNetwork = LoanToken.networks[Id];
        loanInstance = new web3.eth.Contract(
            LoanToken.abi,
            deployedNetwork && deployedNetwork.address,
        );
        //console.log(web3)
        this.setState({
            web3:web3,
            loan:loanInstance,
            investor:accounts
        })
    }



    render() {
        return (
            <Layout>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{padding: 0}}/>
                    <Tabs defaultActiveKey="display" style={{padding: 10}}>
                        <TabPane tab="Bond Purchase" key="display" forceRender={true}>
                            <PurchasePage/>
                        </TabPane>
                        <TabPane tab="Bond State" key="state" forceRender={true}>
                            <BondState/>
                        </TabPane>
                        <TabPane tab="Bond Transfer" key="transfer" forceRender={true}>
                            <TransferPage/>
                        </TabPane>
                    </Tabs>
                </Layout>
            </Layout>
        );
    }
}

export default BondDisplay;

