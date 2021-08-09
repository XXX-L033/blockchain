import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import {Layout, Typography, Table, Button, Modal, Radio, Alert, message, Input, Select} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import $ from 'jquery'
import getWeb3 from "../../getWeb3";
import LoanToken from "../../contracts/LoanToken.json"

const {Content} = Layout;
const {Option} = Select;
const {Title} = Typography;
const stateAccount = '0x005F27B38406Ca25d40ac9B950A9E7b2F3c8033f'
const stateAccount1 = '0x9Bd41Db18ed0Bd1AD0747eA709CE74522F44a4c1'

class PurchasePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            web3: null,
            visible: false,
            textVisible: false,
            investor: null,
            account: null,
            BName: null,
            name: null,
            type: null,
            income: 0,
            BSymbol: null,
            coupon: null,
            url: null,
            startDate: null,
            maturityDate: null,
            faceValue: null,
            regulator: false,
            verifier: false,
            description: null,
            purchaseValue: 0,
            balanceValue: 0,
            state: false,
        }
        this.handleOk = this.handleOk.bind(this)
        this.childHandle = this.childHandle.bind(this)
    }


    componentDidMount = async () => {
        this.getData()
        try {
            const web3 = await getWeb3()
            const accounts = await web3.eth.getAccounts();
            this.setState({
                web3: web3,
                investor: accounts.toString()
            })
        } catch (e) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(e);
        }
    }


    getData = () => {
        $.ajax({
            url: 'http://localhost:8888/purchase',
            type: 'get',
            dataType: 'json',
            success: res => {
                //console.log(res)
                this.setState({
                    tableData: res,
                    account: res.account,
                })
            }
        })
    }

    handleOk = async (values) => {
        this.setState({
            textVisible: true,
        })
    };


    issueBond = async (values) => {
        const {web3, account, investor, startDate, purchaseValue, maturityDate} = this.state;
        // const contract = require('truffle-contract')
        // const loanToken = contract(LoanToken)
        // loanToken.setProvider(this.state.web3.currentProvider)
        // let loanTokenInstance;
        console.log(web3)
        let date = new Date(startDate);
        let dateUnix = Math.floor(date.getTime() / 1000);
        let date2 = new Date(maturityDate);
        let maturityUnix = Math.floor(date2.getTime() / 1000);

        //let acount = web3.toWei(1,'ether');
        let b = web3.eth.getBalance(investor.toString()).then(function (bn) {
            let balance = bn.toString()
            let paid = purchaseValue * 1000000000000000000;
            if (paid <= balance) {
                console.log("y")
                web3.eth.sendTransaction({from: investor, to: account, value: paid})
                let data = {
                    account: account,
                    BName: values.BName,
                    investor: investor,
                    faceValue: purchaseValue,
                    startDate: date,
                    maturityDate: date2,
                    interestRate: values.coupon,
                    state: false,
                }
                fetch('http://localhost:3001/request', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json,text/plain,*/*',/* 格式限制：json、文本、其他格式 */
                        'Content-Type': 'application/x-www-form-urlencoded'/* 请求内容类型 */
                    },
                    body: 'message=' + JSON.stringify(data)
                }).then((response) => {
                    return response.json()
                }).then((data) => {
                    console.log(data)
                }).catch(function (error) {
                    console.log(error)
                })

            } else {
                alert("Insufficient balance")
            }
            return bn.toString()
        });


        //console.log(Number(web3.eth.getBalance(investor.toString())))
        //web3.eth.sendTransaction({from: investor.toString(), to:account, value:10000000000000000})

        // loanToken.deployed().then((instance) => {
        //     loanTokenInstance = instance
        //     //console.log("loan"+loanTokenInstance);
        //     //this.setState({loan: loanTokenInstance})
        //     console.log(instance)
        //
        //
        //     instance.awardItem(account, dateUnix, {from: account})
        //     // const id = instance.getItemId().then(function (bn) {
        //     //     instance.transferItem(account, stateAccount, bn.toString(), {from: account});
        //     //     console.log(bn.toString())
        //     //     return bn.toString()
        //     // });
        // })
    };

    handleCancel = () => {
        this.setState({
            visible: false
        })
    };

    handleChange = (value) => {
        console.log(value);
        this.setState({
            purchaseValue: value
        })
    }

    childHandle = async (values) => {
        this.setState({
            textVisible: false,
            visible: false
        })
        await this.issueBond(values)
    }

    childCancel = () => {
        this.setState({
            textVisible: false,
            visible: false,
        })
    }


    getSpecificBond = (id, obj) => {
        this.setState({
            visible: true,
            _id: id,
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
            url: obj.url,
            description: obj.description,
            regulator: obj.regulator,
            verifier: obj.verifier
        })

    }

    render() {
        let {tableData} = this.state;
        const columns = [
            {
                title: 'Bond Name',
                dataIndex: 'BName',
                key: 'BName',
                width: '20%'
            }, {
                title: 'Issuer Type',
                dataIndex: 'type',
                key: 'type',
                filters: [
                    {text: 'Government', value: '2'},
                    {text: 'Company', value: '1'},
                ],
                onFilter: (value, record) => record.type === value,
                render: type => (type === '1' ? 'Company' : 'Government'),
                width: '15%',
            }, {
                title: 'Issuer Name',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: 'Start Date',
                dataIndex: 'startDate',
                key: 'startDate',
                //render:startDate=>(new Date(startDate)),
                //sorter: (a, b) => a.startDate - b.startDate,
            }, {
                title: 'Interest Rate',
                dataIndex: 'coupon',
                key: 'coupon',
                sorter: (a, b) => a.coupon - b.coupon,
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
                                <Modal title="Bond Detail" visible={this.state.visible} okText="Purchase"
                                       cancelText="Cancel" onOk={() => {
                                    this.handleOk(obj)
                                }}
                                       onCancel={this.handleCancel}>
                                        <p>Bond Name: {this.state.BName}</p>
                                        <p>Issuer Name: {this.state.name}</p>
                                    <p>Issuer Type: {this.state.type === '1' ? 'Company' : 'Government'}</p>
                                    <p>Bond Symbol: {this.state.BSymbol}</p>
                                    <p>Company Net Income: {this.state.income}</p>
                                    <p>Bond Interest Rate: {this.state.coupon} %</p>
                                    <p>Bond URL: <a href={"http://" + this.state.url}>{this.state.url}</a></p>
                                    <p>Bond Start Date: {this.state.startDate}</p>
                                    <p>Bond Maturity Date: {this.state.maturityDate}</p>
                                    <p>Face Value: </p>
                                    <Select style={{width: 120}} defaultValue="Select ETH" onChange={this.handleChange}>
                                    {(this.state.faceValue || []).map((item, index) => {
                                            return <Option value={item}
                                                           key={item + index}>{item === "1" ? "1 ETH " : item === "5" ? "5 ETH" : item === "10" ? "10 ETH " :
                                                item === "20" ? "20 ETH " : item === "100" ? "100 ETH " : "200 ETH "}</Option>
                                        }
                                    )}
                                    </Select>
                                    <p>Description: {this.state.description}</p>
                                </Modal>
                                 <Modal
                                     title="Ensure" visible={this.state.textVisible} onOk={() => {
                                     this.childHandle(obj)
                                 }}
                                     onCancel={this.childCancel}>
                                     <p>Are you sure you want to purchase Bond: <b>{this.state.BName}</b> with <b>{this.state.purchaseValue}ETH</b> ?</p>

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

export default PurchasePage;
