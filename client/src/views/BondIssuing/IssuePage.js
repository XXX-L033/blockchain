import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import moment from "moment";

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
    Divider,
    Tooltip
} from 'antd';
import getWeb3 from "../../getWeb3";
import {InfoCircleOutlined} from '@ant-design/icons';
import IssueSuccess from "./IssueSuccess";
import {Route} from "react-router-dom";

const {Header, Content} = Layout;
const {Title} = Typography;
const {TextArea} = Input;
const {Option} = Select;

const formLayout = {
    labelCol: {
        xs: {span: 15},
        sm: {span: 15},
    },
    wrapperCol: {
        xs: {span: 15},
        sm: {span: 15},
    },
};

const route = {
    path: `/BondIssuing/IssueSuccess`,
    component: IssueSuccess,
}

const checkOptions = [{label: '1 ETH', value: '1'},
    {label: '5 ETH', value: '5'},
    {label: '10 ETH', value: '10'},
    {label: '20 ETH', value: '20'},
    {label: '50 ETH', value: '50'},
    {label: '100 ETH', value: '100'},
    {label: '200 ETH', value: '200'},
];

const dataFormat = 'YYYY/MM/DD';

const acc = sessionStorage.getItem('account');
console.log("account:" + acc);

class IssuePage extends Component {
    constructor(props) {
        super(props);
        this.state = {accounts: null, upgradeTime: null}


    }

    range = (start, end) => {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        console.log(result);
        return result;
    };
    disabledDate = (current) => {
        // cannot choose time before today
        console.log(moment())
        return current < moment()-172000;
    };

    disabledEndDate = (current) => {
        // cannot choose time before tomorrow
        console.log(moment())
        return current < moment();
    };

    disabledDateTime = () => {
        let hours = moment().hours();//0~23
        let minutes = moment().minutes();//0~59
        //can select time after now

        if (this.state.upgradeTime.date() === moment().date()) {
            return {
                disabledHours: () => this.range(0, hours),
                disabledMinutes: () => this.range(0, minutes),
            };
        }
    };

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
        //jump to a new page
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

    render() {
        return (
            <Layout>
                <Layout>
                    <Content>
                        <div className="site-layout-background" style={{padding: '10px'}}>
                            <Title style={{fontWeight: 'bold', fontSize: 15, textAlign: 'left'}}> Fill in the form below
                                and issue green bond:</Title>

                            <Route exact path={route.path} component={route.component}/>

                            <div>
                                <Form
                                    name="bondIssue1"
                                    initialValues={{
                                        remember: true,
                                        ["account"]: acc,
                                        ["regulator"]: "false",
                                        ["verifier"]: "false",
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
                                                        <DatePicker
                                                            format={dataFormat}
                                                            onChange={(upgradeTime) => this.setState({upgradeTime})}
                                                            disabledDate={this.disabledDate}
                                                            disabledTime={this.disabledDateTime}
                                                        />
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
                                                        <DatePicker
                                                            format={dataFormat}
                                                            onChange={(upgradeTime) => this.setState({upgradeTime})}
                                                            disabledDate={this.disabledEndDate}
                                                            disabledTime={this.disabledDateTime}/>
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
                                        <div>
                                            <Row>

                                                <Col>
                                                    <Form.Item
                                                        label="Financial Regulator Checked"
                                                        name="regulator"
                                                        rules={[
                                                            {
                                                                required: true,
                                                            },
                                                        ]}>
                                                        <Select style={{width: 120}} disabled>
                                                            <Option value="true">True</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        label="Green Verifier Checked"
                                                        name="verifier"
                                                        rules={[
                                                            {
                                                                required: true,
                                                            },
                                                        ]}>
                                                        <Select style={{width: 120}} disabled>
                                                            <Option value="true">True</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </div>
                                        <Form.Item
                                            style={{padding: '10px 0px'}}
                                            label="Bond URL"
                                            name="url"
                                            rules={[
                                                {
                                                    required: false,
                                                },
                                            ]}
                                        >
                                            <Input
                                                suffix={<Tooltip
                                                    title="Provide URL link, you can upload documents later, such as annual report">
                                                    <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                                                </Tooltip>}/>
                                        </Form.Item>

                                        <Form.Item
                                            style={{padding: '10px 0px'}}
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
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default IssuePage;
