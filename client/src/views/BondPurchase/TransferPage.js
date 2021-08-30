import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import {Layout, Typography, Table, Button, Modal, Select, Row, Col} from "antd";
import getWeb3 from "../../getWeb3";
import LoanToken from "../../contracts/LoanToken.json";
import $ from "jquery";

const {Content} = Layout;
const {Title} = Typography;

class TransferPage extends Component {

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


    //get bonds in the secondary market
    getData = () => {
        $.ajax({
            url: 'http://localhost:3001/transfer',
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

    //display the sub-modal
    handleOk = async (values) => {
        this.setState({
            textVisible: true,
        })
    };


    //transfer ETH to original investor
    transferOwnership = async (values) => {
        const {web3, account, investor, faceValue, loan} = this.state;
        //console.log(web3)

        let newInvestor = await web3.eth.getAccounts();
        let maturityDate = new Date(this.state.maturityDate);
        let maturityUnix = Math.floor(maturityDate.getTime() / 1000);
        let maturity = await loan.methods.checkEnd(maturityUnix).call();

        if (maturity == false) {
            let balance = await web3.eth.getBalance(newInvestor.toString())

            let paid = faceValue / (1 + values.interestRate * 0.01) * 1000000000000000000;

            //check balance > need to pay, update 2 databases
            if (paid <= balance) {
                console.log("y")
                web3.eth.sendTransaction({from: newInvestor.toString(), to: investor, value: paid});

                values.investor = newInvestor.toString()
                values.transfer = false

                //update investor database, change investor
                fetch(`http://127.0.0.1:3001/update`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json,text/plain,*/*',/* 格式限制：json、文本、其他格式 */
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'message=' + JSON.stringify(values),
                }).then((response) => {
                    return response.json()
                }).catch(function (error) {
                    console.log(error)
                })

            } else {
                alert("Insufficient balance")
            }
        }else{
            alert("The bond has matured")
        }

    };

    handleCancel = () => {
        this.setState({
            visible: false
        })
    };


    childHandle = async (values) => {
        this.setState({
            textVisible: false,
            visible: false
        })
        await this.transferOwnership(values)
    }

    childCancel = () => {
        this.setState({
            textVisible: false,
            visible: false,
        })
    }

    //display specific bond detail
    getSpecificBond = (id, obj) => {
        this.setState({
            visible: true,
            _id: id,
            BName: obj.BName,
            name: obj.name,
            type: obj.type,
            income: obj.income,
            BSymbol: obj.BSymbol,
            coupon: obj.interestRate,
            account: obj.account,
            startDate: obj.startDate,
            maturityDate: obj.maturityDate,
            faceValue: obj.faceValue,
            url: obj.url,
            investor: obj.investor,
            tokenAddress: obj.tokenAddress,
            tokenId: obj.tokenId,
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
            }, {
                title: 'Interest Rate',
                dataIndex: 'interestRate',
                key: 'interestRate',
                sorter: (a, b) => a.interestRate - b.interestRate,
                render: coupon => (coupon + " %")
            }, {
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
                                    <p>Bond Interest Rate: {this.state.coupon} %</p>
                                    <p>Issuer MetaMask: {this.state.account}</p>
                                    <p>Current Holder: {this.state.investor}</p>
                                    <p>Loan Address: {this.state.tokenAddress}</p>
                                    <p>Loan ID: {this.state.tokenId}</p>
                                    <p>Bond URL: <a href={"http://" + this.state.url}>{this.state.url}</a></p>
                                    <p>Bond Start Date: {this.state.startDate}</p>
                                    <p>Bond Maturity Date: {this.state.maturityDate}</p>
                                    <p>Face Value: {this.state.faceValue} ETH</p>
                                </Modal>
                                 <Modal
                                     title="Ensure" visible={this.state.textVisible} onOk={() => {
                                     this.childHandle(obj)
                                 }}
                                     onCancel={this.childCancel}>
                                     <p>Are you sure you want to purchase Bond: <b>{this.state.BName}</b> with <b>{this.state.faceValue}ETH</b> ?</p>

                                </Modal>
                            </span>
                        </div>
                    )
                },
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

export default TransferPage;
