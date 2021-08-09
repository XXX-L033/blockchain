import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';

import {
    Typography,
    Button,
    Layout,
    Table, Modal
} from 'antd';
import getWeb3 from "../../getWeb3";
import $ from "jquery";
import LoanToken from "../../contracts/LoanToken.json";

const {Content} = Layout;
const {Title} = Typography;
const acc = sessionStorage.getItem('account');

class StateCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            purchaseData: [],
            web: null,
            web3: null,
            account: null,
            regulator: false,
            verifier: false,
            regulatorFeedback: null,
            verifierFeedback: null,
            tokenId: 0,
            state: false,
            textVisible: false,
            loan: null,
        }
        this.childHandle = this.childHandle.bind(this)
    }

    componentDidMount = async () => {
        this.getData(acc)
        this.getState(acc)
        try {
            const web3 = await getWeb3()
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = LoanToken.networks[networkId];
            const loanInstance = new web3.eth.Contract(
                LoanToken.abi,
                deployedNetwork && deployedNetwork.address,
            );
            this.setState({
                web3: web3,
                loan: loanInstance,
                account:accounts
            })
        } catch (e) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
        }
    }


    getData = (acc) => {
        $.ajax({
            url: `http://localhost:8888/bond/${acc}`,
            type: 'get',
            dataType: 'json',

            success: res => {
                console.log(acc)
                this.setState({
                    tableData: res,
                    account: res.account,
                })
            }

        })
    }

    getState = (acc) => {
        $.ajax({
            url: `http://localhost:3001/bond/${acc}`,
            type: 'get',
            dataType: 'json',

            success: res => {
                console.log(acc)
                this.setState({
                    purchaseData: res,
                })
            }

        })
    }

    getSpecificBond = async (id, obj) => {
        this.setState({
            textVisible: true,
        })
    }

    childHandle = async (values) => {
        this.setState({
            textVisible: false,
        })
        await this.issue(values)
    }

    childCancel = () => {
        this.setState({
            textVisible: false,
        })
    }

    issue = async (obj) => {
        const {web3, loan, account} = this.state;
        let investor = obj.investor
        const contract = require('truffle-contract')
        const loanToken = contract(LoanToken)
        let loanTokenInstance;
        loanToken.setProvider(web3.currentProvider)
        let date = new Date(obj.startDate);
        let dateUnix = Math.floor(date.getTime() / 1000);

        if(obj.account === account.toString()){
            loanToken.deployed().then(async (instance) => {
                loanTokenInstance = instance
                //contract address
                console.log(instance.address)
                obj.tokenAddress = instance.address

                instance.awardItem(acc, dateUnix, {from: acc})

                let id = await loan.methods.getItemId().call();
                obj.tokenId = id;
                obj.state = true;
                instance.transferItem(acc, investor, id, {from: acc});
                console.log(id)
            })


            fetch(`http://localhost:3001/update`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json,text/plain,*/*',/* 格式限制：json、文本、其他格式 */
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'message=' + JSON.stringify(obj),
            }).then((response) => {
                return response.json()
            }).catch(function (error) {
                console.log(error)
            })
            this.setState({
                visible: false,
            })
        }else{
            alert("MetaMask Accounts does not match")
        }
    }


    render() {
        const {tableData, purchaseData} = this.state;
        const columns = [
            {
                title: 'Bond Name',
                dataIndex: 'BName',
                key: 'BName',
                width: '10%'
            }, {
                title: 'Regulator state',
                dataIndex: 'regulator',
                key: 'regulator',
                width: '15%',
                render: (regulator) => regulator.toString()
            }, {
                title: 'Regulator Feedback',
                dataIndex: 'regulatorFeedback',
                key: 'regulatorFeedback',
            }, {
                title: 'Verifier state',
                dataIndex: 'verifier',
                key: 'verifier',
                width: '15%',
                render: (verifier) => verifier.toString()
            }, {
                title: 'Verifier Feedback',
                dataIndex: 'verifierFeedback',
                key: 'verifierFeedback',
            }, {
                title: 'Issue State',
                dataIndex: 'state',
                key: 'state',
                render: (state) => (state === true ? "true" : "false")
            }
        ]

        const column2 = [
            {
                title: 'Bond Name',
                dataIndex: 'BName',
                key: 'BName',
                width: '10%'
            }, {
                title: 'Investor',
                dataIndex: 'investor',
                key: 'investor'
            }, {
                title: 'Purchase',
                dataIndex: 'faceValue',
                key: 'faceValue',
                render: (value) => (value + " ETH")
            }, {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
                filters: [
                    {text: 'Issued', value: true},
                    {text: 'Unhandled', value: false},
                ],
                onFilter: (value, record) => record.state === value,
                render: (state) => (state === true ? 'Issued' : 'Unhandled')
            }, {
                title: 'Operate',
                key: 'operate',
                render: (record, obj) => {
                    return (
                        <div>
                            <span>
                                <Button type="primary" disabled={obj.state} onClick={() => {
                                    this.getSpecificBond(record._id, obj)
                                }}>Issue</Button>
                                <Modal
                                    title="Ensure" visible={this.state.textVisible} onOk={() => {
                                    this.childHandle(obj)
                                }}
                                    onCancel={this.childCancel}>
                                     <p>Bond Loan will be given to : <b>{obj.investor}</b> on <b>{obj.startDate}</b> </p>

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
                    <Content>
                        <div className="site-layout" style={{padding: '10px'}}>
                            <Title style={{fontWeight: 'bold', fontSize: 15, textAlign: 'left'}}> Your Bond
                                State:</Title>
                            <Table
                                className='checkBond'
                                columns={columns}
                                dataSource={tableData}
                                rowKey={record => "" + record._id}
                            />
                        </div>
                        <div className="site-layout" style={{padding: '10px'}}>
                            <Title style={{fontWeight: 'bold', fontSize: 15, textAlign: 'left'}}> Purchase
                                Request:</Title>
                            <Table
                                className='purchaseBond'
                                columns={column2}
                                dataSource={purchaseData}
                                rowKey={record => "" + record._id}
                            />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default StateCheck;
