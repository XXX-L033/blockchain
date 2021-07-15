import React, {Component} from "react";
import 'antd/dist/antd.css';
import '../../index.css';
import {Layout, Typography, Table} from "antd";
import $ from 'jquery'

const {Header, Content} = Layout;
const {Title} = Typography;


class CheckBond extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData:[],
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () =>{

       $.ajax({
           url:'http://localhost:8888/bond',
           type:'get',
           dataType:'json',
           success: res => {
               console.log(res)
               this.setState({
                   tableData: res,

               })
           }
       })
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
                title:'Start Date',
                dataIndex: 'startDate',
                key:'startDate',
                sorter:true,
            }, {
                title: 'Interest Rate',
                dataIndex: 'coupon',
                key: 'coupon'
             }
             , {
                title: 'Detail',
                key:'detail',
                render: (record) => {
                    return (
                        <div>
                            <span className="action" onClick={() => this.handle('detail',record)}>See Detail</span>
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
                                rowKey={record=>""+record._id}
                                />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default CheckBond;
