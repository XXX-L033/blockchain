import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';


import {
    Checkbox,
    DatePicker,
    Select,
    Radio,
    Col,
    Row,
    Card,
    Typography,
    Button,
    Form,
    Layout,
    Input,
    Divider
} from 'antd';
import getWeb3 from "../../getWeb3";
//import LoanContract from "../../contracts/LoanContract";
import IssueSuccess from "./IssueSuccess";
import {Route} from "react-router-dom";

const {Header, Content} = Layout;
const {Title} = Typography;
const {TextArea} = Input;
let LoanContract = require('../../contracts/LoanContract.json')

const formLayout = {
    labelCol: {
        xs: { span: 15},
        sm: { span: 15 },
    },
    wrapperCol: {
        xs: { span: 15 },
        sm: { span: 15 },
    },
};

const route = {
    path: `/BondIssuing/IssueSuccess`,
    component: IssueSuccess,
}

const checkOptions = [{label: '1 ETH', value: '1 ETH'},
    {label: '5 ETH', value: '5 ETH'},
    {label: '10 ETH', value: '10 ETH'},
    {label: '20 ETH', value: '20 ETH'},
    {label: '50 ETH', value: '50 ETH'},
    {label: '100 ETH', value: '100 ETH'},
    {label: '200 ETH', value: '200 ETH'},
];

const dataFormat = 'YYYY/MM/DD';

const acc = sessionStorage.getItem('account');
console.log("account:" + acc);

class IssuePage extends Component {
    constructor(props) {
        super(props);
        this.state = {accounts: null}
    }

    handle = (values) => {
        fetch('http://localhost:8888/issue', {
            method: 'post',
            headers: {
                'Accept': 'application/json,text/plain,*/*',/* 格式限制：json、文本、其他格式 */
                'Content-Type': 'application/x-www-form-urlencoded'/* 请求内容类型 */
            },
            body: 'message=' + JSON.stringify(values)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data)
        }).catch(function (error) {
            console.log(error)
        })
        const jumpForm2 = document.createElement('form');
        document.body.appendChild(jumpForm2);
        jumpForm2.action = `/BondIssuing/IssueSuccess`;
        jumpForm2.submit();

        document.body.removeChild(jumpForm2);
    }

    componentDidMount = async () => {
        const web3 = await getWeb3();

        const accountValue = await web3.eth.getAccounts();

        this.setState({accountValue}, this.runExample);

        console.log("account:" + accountValue);
    };

    runExample = async () => {
        const {accountValue} = this.state;

        // Update state with the result.
        this.setState({accounts: accountValue});
    };

    //

    render() {

        return (
            <Layout>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{padding: 0}}/>
                    <Content>
                        <div className="site-layout-background" style={{padding: '10px'}}>
                            <Title style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center'}}>Issue Green
                                Bond</Title>
                            <Divider/>
                            <Title style={{fontWeight: 'bold', fontSize: 15, textAlign: 'left'}}> Fill in the form below
                                and issue green bond:</Title>

                            <Route exact path={route.path} component={route.component}/>

                            <Form
                                name="bondIssue1"
                                initialValues={{
                                    remember: true,
                                    ["account"]: acc,
                                }}
                                onFinish={this.handle.bind(this)}
                                layout='inline'
                            >
                                <Card style={{padding: 10, background: '#F5F5F5'}}
                                      title="Issuer Detail"
                                >
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Issuer Type"
                                                name="type"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Radio.Group name="issuerT" size="large">
                                                    <Radio value={1}>Company</Radio>
                                                    <Radio value={2}>Government</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Company Name"
                                                name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Net Income"
                                                name="income"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                </Card>

                                <Card style={{padding: 10, background: '#F5F5F5'}}
                                      title="Bond Detail"
                                >

                                    <Row>
                                        <Col span={8}>
                                            <Form.Item
                                                label="Bond Name"
                                                name="BName"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label="Bond Symbol"
                                                name="BSymbol"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label="Interest Rate"
                                                name="coupon"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    suffix="%"/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <div>
                                        <Row>
                                            <Col span={24}>
                                                <Form.Item
                                                    style={{padding: '10px 0px'}}
                                                    label="MetaMask Account"
                                                    name="account"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col>
                                                <Form.Item
                                                    label="Start Date"
                                                    name="startDate"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <DatePicker format={dataFormat}/>
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Form.Item
                                                    label="Maturity Date"
                                                    name="maturityDate"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <DatePicker format={dataFormat}/>
                                                </Form.Item>
                                            </Col>
                                            <Col md={6} sm={24}></Col>
                                        </Row>
                                    </div>

                                    <Form.Item
                                        label="Face Value"
                                        name="faceValue"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        {/*<Select defaultValue="1 ETH" style={{width: 200}}>*/}
                                        {/*    <Option value="1">1 ETH</Option>*/}
                                        {/*    <Option value="5">5 ETH</Option>*/}
                                        {/*    <Option value="10">10 ETH</Option>*/}
                                        {/*    <Option value="20">20 ETH</Option>*/}
                                        {/*    <Option value="50">50 ETH</Option>*/}
                                        {/*    <Option value="100">100 ETH</Option>*/}
                                        {/*</Select>*/}
                                        <Checkbox.Group options={checkOptions}/>


                                    </Form.Item>
                                    <Form.Item
                                        label="Bond Description"
                                        name="description"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <TextArea rows={4}/>
                                    </Form.Item>

                                    <Form.Item
                                        style={{padding: '10px 0px'}}>
                                        <Button type="primary" htmlType="submit" className="submit-form-button">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Card>
                            </Form>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default IssuePage;
