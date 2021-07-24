import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import {Layout, Typography, Table, Button, Modal} from "antd";
import $ from 'jquery'
import getWeb3 from "../../getWeb3";
import LoanToken from "../../contracts/LoanToken.json"

const {Header, Content} = Layout;
const {Title} = Typography;

class GreenFeature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            account: null,
            visible: false,
            BName: null,
            name: null,
            BSymbol: null,
            description: null
        }
    }

    componentDidMount = async () => {
        this.getData()

        try {
            const web3 = await getWeb3()

            //Promise - return network id that connected
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = LoanToken.networks[networkId];
            const token = new web3.eth.Contract(LoanToken.abi, deployedNetwork && deployedNetwork.address)
            console.log(token)
            //let num = await token.methods.awardItem().call();
        } catch (e) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(e);
        }
    }

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

    handleOk = () => {
        this.setState({
            visible: false
        })
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
            BSymbol: obj.BSymbol,
            account: obj.account,
            description: obj.description
        })
        console.log(obj.BName)
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
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                sorter: true,
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
                                <Modal title="Bond Detail" visible={this.state.visible} onOk={this.handleOk}
                                       onCancel={this.handleCancel}>
                                        <p>Bond Name: {this.state.BName}</p>
                                        <p>Issuer Name: {this.state.name}</p>
                                    <p>Bond Symbol: {this.state.BSymbol}</p>
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

export default GreenFeature;
