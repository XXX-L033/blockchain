import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import ReactDOM from 'react-dom';
import {Layout, Typography, Table, Button, Modal, Alert, Input} from "antd";
import $ from 'jquery'
import getWeb3 from "../../getWeb3";
import LoanToken from "../../contracts/LoanToken.json"

const {Header, Content} = Layout;
const {Title} = Typography;
const {TextArea} = Input;
const stateAccount = '0x005F27B38406Ca25d40ac9B950A9E7b2F3c8033f'
const stateAccount1 = '0x9Bd41Db18ed0Bd1AD0747eA709CE74522F44a4c1'

class CheckBond extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            web3: null,
            account: null,
            visible: false,
            textVisible: false,
            BName: null,
            name: null,
            BSymbol: null,
            type: null,
            url: null,
            description: null,
            regulator: false,
            verifier: false,
            tokenId: 0,
            verifierFeedback: null,
            state:false
        }
        this.handleReady = this.handleReady.bind(this)
        this.childHandle = this.childHandle.bind(this)
    }


    componentDidMount = async () => {
        this.getData()
        try {
            const web3 = await getWeb3()
            this.setState({web3})
            //await this.instantiateContract()
        } catch (e) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(e);
        }
    }


    getData = () => {
        $.ajax({
            url: 'http://localhost:8888/bond/verifier',
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

    handleReady = async (values) => {
        values.verifier = true;
        if(values.regulator == true){
            values.state = true
        }
        console.log(values)

        fetch(`http://127.0.0.1:8888/update`, {
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
        this.setState({
            visible:false,
        })

        // alert('Click to agree that the bond meets the financial issuance standards, ' +
        //     'if the financial regulator also agrees to issue, the bond will be issued at the start time')

        //await this.issueBond()
    };


    handleCancel = () => {
        this.setState({
            textVisible: true
        })
    };

    inputChange(e) {
        this.setState({
            verifierFeedback: e.target.value
        })
    }

    childHandle = (values) => {
        this.setState({
            textVisible: false,
            visible: false
        })
        values.verifierFeedback = this.state.verifierFeedback
        console.log(values);
        fetch(`http://127.0.0.1:8888/update`, {
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
            BName: obj.BName,
            name: obj.name,
            type: obj.type,
            url: obj.url,
            BSymbol: obj.BSymbol,
            regulator: obj.regulator,
            verifier: obj.verifier,
            description: obj.description
        })
        console.log(obj)
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
                title: 'Bond URL',
                dataIndex: 'url',
                key: 'url',
                render: (url) => <a href={"http://"+url}>{url}</a>
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
                                <Modal title="Bond Detail" visible={this.state.visible} okText="Issuable"
                                       cancelText="Unissuable" onOk={() => {
                                    this.handleReady(obj)
                                }}
                                       onCancel={this.handleCancel}>
                                        <p>Bond Name: {this.state.BName}</p>
                                        <p>Issuer Type: {this.state.type === '1' ? 'Company' : 'Government'}</p>
                                        <p>Issuer Name: {this.state.name}</p>
                                        <p>Bond Symbol: {this.state.BSymbol}</p>
                                        <p>Bond URL:{this.state.url}</p>
                                        <p>MeatMask Account: {this.state.account}</p>
                                        <p>Regulator Check State:{this.state.regulator.toString()}</p>
                                        <p>Verifier Check State:{this.state.verifier.toString()}</p>
                                        <p>Description: {this.state.description}</p>
                                </Modal>
                                <Modal
                                    title="Feedback Given" visible={this.state.textVisible} onOk={() => {
                                    this.childHandle(obj)
                                }}
                                    onCancel={this.childCancel}>
                                    <p>Why the bond is unissuable:</p>
                                    <TextArea type="text" onChange={(e) => this.inputChange(e)} id="feedback" rows={4}/>
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
