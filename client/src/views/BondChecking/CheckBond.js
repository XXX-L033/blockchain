import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import ReactDOM from 'react-dom';
import {Layout, Typography, Table, Button, Modal, Alert} from "antd";
import $ from 'jquery'
import getWeb3 from "../../getWeb3";
import LoanToken from "../../contracts/LoanToken.json"

const {Header, Content} = Layout;
const {Title} = Typography;
const stateAccount = '0x005F27B38406Ca25d40ac9B950A9E7b2F3c8033f'

class CheckBond extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            contract: null,
            web3: null,
            account: null,
            visible: false,
            BName: null,
            name: null,
            type: null,
            income: 0,
            BSymbol: null,
            coupon: null,
            startDate: null,
            maturityDate: null,
            faceValue: null,
            description: null,
            regulator: false,
            verifier: true,
            loan: null,
            tokenId:0,
        }
    }


    componentDidMount = async () => {
        this.getData()
        try {
            const web3 = await getWeb3()
            // const networkId = await web3.eth.net.getId();
            // const deployedNetwork = LoanToken.networks[networkId];
            // const contract = new web3.eth.Contract(LoanToken.abi, deployedNetwork && deployedNetwork.address)
            this.setState({web3})
            //await this.instantiateContract()
        } catch (e) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(e);
        }
    }

    // instantiateContract() {
    //     const contract1 = require('truffle-contract')
    //     const loanToken = contract1(LoanToken)
    //     loanToken.setProvider(this.state.web3.currentProvider)
    //     console.log(account)
    //     //Promise - return network id that connected
    //
    //     let loanTokenInstance;
    //
    //     loanToken.deployed().then((instance) => {
    //         loanTokenInstance = instance
    //         //console.log("loan"+loanTokenInstance);
    //         this.setState({loan: loanTokenInstance})
    //         instance.awardItem(account,{from:account})
    //         console.log(instance.address)
    //     })
    // }

    getData = () => {
        $.ajax({
            url: 'http://localhost:8888/bond',
            type: 'get',
            dataType: 'json',
            success: res => {
                console.log(res)
                this.setState({
                    tableData: res,
                    account: res.account,
                })
            }
        })
    }

    handleOk = async () => {
        this.setState({
            regulator: true,
        })
        // alert('Click to agree that the bond meets the financial issuance standards, ' +
        //     'if the green verifier also agrees to issue, the bond will be issued at the start time')
        await this.issueBond()
    };


    issueBond = async () => {
        const {web3, account, contract, regulator, verifier, loan} = this.state;
        const contract1 = require('truffle-contract')
        const loanToken = contract1(LoanToken)
        loanToken.setProvider(this.state.web3.currentProvider)
        let loanTokenInstance;

        loanToken.deployed().then((instance) => {
            loanTokenInstance = instance
            //console.log("loan"+loanTokenInstance);
            this.setState({loan: loanTokenInstance})
            console.log(instance)
            instance.awardItem(account, {from: account})
            const id = instance.getItemId()
            .then(function (bn) {

                instance.transferItem(account, stateAccount, bn.toString(), {from:account});
                return bn.toString()
            });
            console.log(id)



        })

        if (regulator == true && verifier == true) {
            // console.log(regulator)
            //console.log("loan"+loan.address);
            // const networkId = await web3.eth.net.getId();
            // const deployedNetwork = LoanToken.networks[networkId];
            // const token = new web3.eth.Contract(LoanToken.abi, deployedNetwork && deployedNetwork.address)
            // // console.log(token)
            // const token1 = await token.deployed()
            // const num = await token.returnNum().call();
            // // const newToken = await token.methods.awardItem('0x51d0Ae990fa1aef157D0dAD66409445928d3404B').call()
            // // //console.log(contract.methods.ownerOf(1).call());
            // console.log(num)
            //await this.instantiateContract()
        }
        // const num = await contract.methods.returnNum().call();
        // console.log(num);
    };

    handleCancel = () => {
        this.setState({
            visible: false
        })
    };

    getSpecificBond = (id, obj) => {
        this.setState({
            visible: true,
            BName: obj.BName,
            name: obj.name,
            type: obj.type,
            income: obj.income,
            BSymbol: obj.BSymbol,
            coupon: obj.coupon,
            account: obj.account,
            startDate: obj.startDate,
            maturityDate: obj.maturityDate,
            faceValue: obj.faceValue,
            description: obj.description
        })
        console.log(obj.BName + "aaaaa")
    }

    render() {
        const {tableData} = this.state;
        const columns = [
            {
                title: 'Bond Name',
                dataIndex: 'BName',
                key: 'BName',
                width: '20%'
            }, {
                title: 'Issuer Name',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: 'Start Date',
                dataIndex: 'startDate',
                key: 'startDate',
                sorter: true,
            }, {
                title: 'Interest Rate',
                dataIndex: 'coupon',
                key: 'coupon'
            }
            , {
                title: 'Detail',
                key: 'detail',
                render: (record, obj) => {
                    return (
                        <div>
                            <span>
                                <Button type="primary" onClick={() => {
                                    this.getSpecificBond(record._id, obj)
                                }}>See Detail</Button>
                                <Modal title="Bond Detail" visible={this.state.visible} okText="Issuable"
                                       cancelText="Unissuable" onOk={this.handleOk}
                                       onCancel={this.handleCancel}>
                                        <p>Bond Name: {this.state.BName}</p>
                                        <p>Issuer Name: {this.state.name}</p>
                                    <p>Issuer Type: {this.state.type}</p>
                                    <p>Bond Symbol: {this.state.BSymbol}</p>
                                    <p>Company Net Income: {this.state.income}</p>
                                    <p>MeatMask Account: {this.state.account}</p>
                                    <p>Bond Start Date: {this.state.startDate}</p>
                                    <p>Bond Maturity Date: {this.state.maturityDate}</p>
                                    <p>Face Value: {this.state.faceValue}</p>
                                    <p>Description: {this.state.description}</p>
                                      </Modal>
                            </span>
                        </div>
                    )
                }
            }
        ]


        return (
            <Layout>
                <Layout>
                    <Header className="site-layout-sub-header" style={{padding: 0}}/>
                    <Content>
                        <div className="site-layout" style={{padding: '10px'}}>
                            <Title style={{fontWeight: 'bold', fontSize: 15, textAlign: 'left'}}> Bond applied for
                                issuance:</Title>
                            <Table
                                className='checkBond'
                                columns={columns}
                                dataSource={tableData}
                                rowKey={record => "" + record._id}
                            />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default CheckBond;
