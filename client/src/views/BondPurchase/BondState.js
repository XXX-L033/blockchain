import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import {Layout, Typography, Table, Button, Modal, Row, Col} from "antd";
import $ from 'jquery'
import getWeb3 from "../../getWeb3";
import LoanToken from "../../contracts/LoanToken.json"

const {Content} = Layout;
const {Title} = Typography;

const investor = sessionStorage.getItem('investor');
console.log("investor:" + investor);

class BondState extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            visible: false,
            textVisible: false,
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
            loan:null,
        }
    }

    componentDidMount = async () => {
        try {
            this.getData(investor)
            let web3 = await getWeb3();
            console.log(web3)
            //web3.then((x) => this.setState({web3:x}));
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = LoanToken.networks[networkId];
            const loanInstance = new web3.eth.Contract(
                LoanToken.abi,
                deployedNetwork && deployedNetwork.address,
            );
            console.log(loanInstance)
            this.setState({
                loan:loanInstance
            })
        } catch (e) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(e);
        }
    }

    getData = (investor) => {
        $.ajax({
            url: `http://localhost:3001/state/${investor}`,
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

    handleCancel = () => {
        this.setState({
            visible: false,
            textVisible:false
        })
    };

    returnToken = async (obj) =>{
        const {loan} = this.state
        let maturityDate = new Date(obj.maturityDate);
        let maturityUnix = Math.floor(maturityDate.getTime() / 1000);
        let maturity = await loan.methods.checkEnd(maturityUnix).call();
        if(maturity == true){
        //let instance = JSON.parse(sessionStorage.getItem(obj.tokenAddress))
        //console.log(instance)

        // let json = JSON.parse(sessionStorage.getItem(obj.tokenAddress),function(k,v){
        //     if(v.indexOf && v.indexOf('function') > -1){
        //         return eval("(function(){return "+v+" })()")
        //     }
        //     return v;
        // });
        // console.log(json)
        loan.transferItem(obj.investor, obj.account, obj.tokenId);
        console.log(loan)
        }else{
            this.setState({
                textVisible:true,
            })
        }
    }

    transferToken = async (obj) =>{

    }

    getSpecificBond = async (id, obj) => {
        const {loan} = this.state
        this.setState({
            visible: true,
            _id: id,
            state:obj.state
        })
        let maturityDate = new Date(obj.maturityDate);
        let maturityUnix = Math.floor(maturityDate.getTime() / 1000);
        let maturity = await loan.methods.checkEnd(maturityUnix).call();
        if(maturity == true){
            alert("This bond has come to the matured, please return back the token")
            this.setState({
                state:true
            })
            loan.methods.transferItem(obj.investor, obj.account, obj.tokenId);
        }

    }

    render() {
        let {tableData} = this.state;
        const columns = [
            {
                title: 'Bond Name',
                dataIndex: 'BName',
                key: 'BName',
            }, {
                title: 'Issuer Name',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: 'Maturity Date',
                dataIndex: 'maturityDate',
                key: 'maturityDate',
                render: maturityDate => (maturityDate.toString().substr(0, 10)),
            }, {
                title: 'Interest Rate',
                dataIndex: 'interestRate',
                key: 'interestRate',
                sorter: (a, b) => a.interestRate - b.interestRate,
                render:rate =>(rate+" %")
            }, {
                title: 'Loan ID',
                dataIndex: 'tokenId',
                key: 'tokenId'
            }, {
                title:'Purchase State',
                dataIndex:'state',
                key:'state',
                render:state => (state.toString() === 'true'? "Success": "Unhandled")
            },{
                title: 'Operate',
                key: 'operate',
                render: (record, obj) => {
                    return (
                        <div>
                            <span>
                                <Row>
                                    <Col span={13}>
                                <Button type="primary" onClick={() => {
                                    this.getSpecificBond(record._id, obj)
                                }}>See Detail</Button>
                                <Modal title="Bond Detail" visible={this.state.visible}
                                       cancelText="Cancel" onOk={this.handleCancel}
                                       onCancel={this.handleCancel}>
                                        <p>Bond Name: {obj.BName}</p>
                                        <p>Issuer Name: {obj.name}</p>
                                    <p>Issuer Type: {obj.type === '1' ? 'Company' : 'Government'}</p>
                                    <p>Bond Interest Rate: {obj.interestRate} %</p>
                                    <p>Bond URL: <a href={"http://" + obj.url}>{obj.url}</a></p>
                                    <p>Loan Address: {obj.tokenAddress}</p>
                                    <p>Loan ID: {obj.tokenId}</p>
                                    <p>Bond Start Date: {obj.startDate.toString().substr(0, 10)}</p>
                                    <p>Bond Maturity Date: {obj.maturityDate.toString().substr(0, 10)}</p>
                                    <p>Purchase Value: {obj.faceValue} ETH</p>
                                </Modal>
                                        </Col>
                                    <Col span={3}>
                                <Button type="primary" disabled={obj.finish} onClick={()=>{this.returnToken(obj)}}>Transfer</Button>
                                        <Modal title="Alert" visible={this.state.textVisible} okText="Transfer" onOk={this.transferToken(obj)}
                                        onCancel={this.handleCancel}>
                                            <p>This bond is not yet due, you can choose to hold it or transfer</p>
                                        </Modal>
                                    </Col>
                                </Row>
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
                            <Title style={{fontWeight: 'bold', fontSize: 15, textAlign: 'left'}}> Bond you
                                purchased:</Title>
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

export default BondState;
