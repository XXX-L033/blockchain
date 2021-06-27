import React, {Component} from 'react';
import './main';
//router
import {BrowserRouter} from 'react-router-dom';

//content
import ContentMain from "../components/ContentMain";
import CustomMenu from '../components/Menu';

//UI-antd
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import logo from "../image/logo.svg";

const {Sider, Content, Header} = Layout;

const {children} = props;

let screenHeight= window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

const Main = (props) =>{

}

class Main extends Component {
    render() {
        return (
            <div className="App" >
                <BrowserRouter>
                    <Layout>
                        <Sider
                            className="App-customMenu"
                            style={{height:screenHeight}}
                            breakpoint="lg"
                            collapsedWidth="0"
                            onBreakpoint={broken => {
                                console.log(broken);
                            }}
                            onCollapse={(collapsed, type) => {
                                console.log(collapsed, type);
                            }}>
                            <div className="Logo" />
                            <Header className="logoPic">
                                <img style={{padding:'0px'}}
                                     alt="LOGO"
                                     width={125}
                                     src={logo}
                                />
                            </Header>
                            <CustomMenu/>
                        </Sider>
                        <Layout>
                            <Content className="App-contentMain" style={{height:screenHeight}}>
                                {children}
                            </Content>
                        </Layout>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}
export default Main;
