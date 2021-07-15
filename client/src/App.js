import React, {Component} from 'react';
import './main';
//router
import {BrowserRouter, HashRouter} from 'react-router-dom';

//content
import ContentMain from "./components/ContentMain";
import CustomMenu from './components/Menu';

//UI-antd
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import logo from "./image/logo.svg";

const {Sider, Content, Header} = Layout;

let screenHeight= window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

class App extends Component {
    render() {
        return (
            <div className="App" >
                <BrowserRouter>
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider
                            className="App-customMenu"
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
                        <Layout style={{ minHeight: '100vh' }}>
                            <Content className="App-contentMain">
                                <ContentMain/>
                            </Content>
                        </Layout>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}
export default App;
