import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import {Layout, Typography, Table, Button, Modal, Select, Col} from "antd";
import $ from 'jquery'
import getWeb3 from "../../getWeb3";
import LoanToken from "../../contracts/LoanToken.json"

const {Content} = Layout;
const {Option} = Select;
const {Title} = Typography;

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
            loan: null
        }
        this.handleOk = this.handleOk.bind(this)
        this.childHandle = this.childHandle.bind(this)
    }


    componentDidMount = async () => {
        this.getData()
        try {
            const web3 = await getWeb3()
            //console.log(web3)
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = LoanToken.networks[networkId];
            const loanInstance = new web3.eth.Contract(
                LoanToken.abi,
                deployedNetwork && deployedNetwork.address,
            );
            this.setState({
                web3: web3,
                investor: accounts.toString(),
                loan: loanInstance
            })
        } catch (e) {
            alert();
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
        const {web3, account, investor, startDate, purchaseValue, maturityDate, loan} = this.state;
        //console.log(web3)
        let date = new Date(startDate);
        let date2 = new Date(maturityDate);

        let b = web3.eth.getBalance(investor.toString()).then(function (bn) {
            let balance = bn.toString()
            let paid = purchaseValue / (1 + values.coupon * 0.01) * 1000000000000000000;

            //check balance > need to pay, update 2 databases
            if (paid <= balance) {
                console.log("y")
                web3.eth.sendTransaction({from: investor, to: account, value: paid})

                values.totalGet =+ purchaseValue;
                values.totalPerson =+ 1;

                //update bond database - money get, total person
                fetch(`http://127.0.0.1:8888/update`,{
                    method:'post',
                    headers: {
                        'Accept': 'application/json,text/plain,*/*',/* 格式限制：json、文本、其他格式 */
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'message='+JSON.stringify(values),
                }).then((response) =>{
                    return response.json()
                }).catch(function (error) {
                    console.log(error)
                })
                let data = {
                    account: account,
                    name: values.name,
                    BName: values.BName,
                    investor: investor,
                    faceValue: purchaseValue,
                    startDate: date,
                    maturityDate: date2,
                    interestRate: values.coupon,
                    type: values.type,
                    state: false,
                    transfer: false,
                    finish: false,
                    url: values.url,
                }

                //add investor database, add new purchase
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
            }, {
                title: 'Issuer Name',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: 'Start Date',
                dataIndex: 'startDate',
                key: 'startDate',
                render: startDate => (startDate.toString().substr(0, 10)),
                //sorter: (a, b) => a.startDate - b.startDate,
            }, {
                title: 'Interest Rate',
                dataIndex: 'coupon',
                key: 'coupon',
                sorter: (a, b) => a.coupon - b.coupon,
                render: coupon => (coupon + " %")
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
                                    <p>Bond Interest Rate: {this.state.coupon} %</p>
                                    <p>Bond URL: <a href={"http://" + this.state.url}>{this.state.url}</a></p>
                                    <p>Bond Start Date: {new Date(this.state.startDate).toString().substr(0, 10)}</p>
                                    <p>Bond Maturity Date: {new Date(this.state.maturityDate).toString().substr(0, 10)}</p>
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
                                {/*<Modal*/}
                                {/*    title="Ensure" visible={this.state.transferVisible} onOk={() => {*/}
                                {/*    this.childTransfer(obj)*/}
                                {/*}}*/}
                                {/*    onCancel={this.childCancel}>*/}
                                {/*     <p>Are you sure you want to sell Bond: <b>{this.state.BName}</b> with <b>{this.state.purchaseValue}ETH</b> ?</p>*/}

                                {/*</Modal>*/}
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
