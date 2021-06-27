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
import {LockOutlined, WalletOutlined, EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined} from '@ant-design/icons';
import getWeb3 from "../../getWeb3";
import SimpleStorageContract from "../../contracts/LoanContract.json";

const {Header, Content} = Layout;
const {Title} = Typography;
const {Option} = Select;
const {TextArea} = Input;
const dateFormat = 'YYYY/MM/DD';

const onFinish = (values) => {
    //const onFinish = (values) => {
    console.log('issuer', values);
    //};
};

const formItemLayout = {

    labelCol: {
        span: 25
    },
    wrapperCol: {
        span: 20
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 3,
        span: 10,
    },
};

const buttonLayout = {
    wrapperCol: {
        offset: 3,
        span: 18,
    },
};

const checkOptions = [{label:'1 ETH', value:'1'},
    {label:'5 ETH', value:'5 ETH'},
    {label:'10 ETH', value:'10'},
    {label:'20 ETH', value:'20'},
    {label:'50 ETH', value:'50'},
    {label:'100 ETH', value:'100'},
    {label:'200 ETH', value:'200'},
];

// const [v, setValue] = React.useState(1);
//
// const onChange = e => {
//     setValue(e.target.value);
// };


class IssuePage extends Component {

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
                            <Card style={{padding: 10, background: '#F5F5F5'}}
                                  title="Issuer Detail"
                            >
                                <Form
                                    name="bondIssue1"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    layout="inline"
                                >
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
                                </Form>
                                <div style={{padding: '5px 0px'}}>
                                    <Form
                                        name="bondIssue"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                        layout="inline"
                                    >
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Issuer Name"
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
                                                    name="name"
                                                    style={{padding: '0px 10px'}}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your address!',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        prefix="$" suffix="USD"/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Card>

                            <Card style={{padding: 10, background: '#F5F5F5'}}
                                  title="Bond Detail"
                            >
                                <Form
                                    name="bondIssue2"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}

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
                                                    <DatePicker/>
                                                </Form.Item>
                                            </Col>
                                            <Col push={3}>
                                                <Form.Item
                                                    label="Maturity Date"
                                                    name="maturityDate"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <DatePicker/>
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
                                        <Checkbox.Group options={checkOptions} />


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

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="submit-form-button">
                                            Submit
                                        </Button>

                                    </Form.Item>

                                </Form>
                            </Card>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default IssuePage;
