import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import {Layout, Typography, Table} from "antd";

const { Content} = Layout;
const {Title} = Typography;

const columns = [
    {
        title: 'Bond Name',
        dataIndex: 'name',
        key: 'name',
        width: '15%'
    }, {
        title: 'Issuer Type',
        dataIndex: 'type',
        key: 'type',
        filters: [
            {text: 'Government', value: 'government'},
            {text: 'Company', value: 'company'},
        ],
        width: '15%',
    }, {
        title: 'Issuer Name',
        dataIndex: 'CName',
        key: 'CName',
    }, {
        title: 'Maturity Date',
        dataIndex: 'maturityDate',
        key: 'maturityDate',
        sorter: true,
    }, {
        title: 'Interest Rate',
        dataIndex: 'coupon',
        key: 'coupon',
        sorter: true
    }, {
        title: 'Detail',
        dataIndex: 'detail',
        key: 'detail',
        render: text => <a>{text}</a>
    }
]


class TransferPage extends Component {
    render() {
        return (
            <Layout>
                <Layout>
                    <Content>
                        <div className="site-layout-background" style={{padding: '10px'}}>
                            <Title style={{fontWeight: 'bold', fontSize: 15, textAlign: 'left'}}> Bond for
                                transfer:</Title>
                            <Table
                                columns={columns}
                            />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default TransferPage;
