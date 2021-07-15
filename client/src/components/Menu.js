import React from 'react'
import {Link} from 'react-router-dom';
import {Menu} from 'antd';
const menus =global.menus;
//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class CustomMenu extends React.Component {
    handleClick = (e) => {
        console.log('click ', e);
    }
    renderSubMenu = ({key, title, subs}) => {
        return (
            <Menu.SubMenu key={key} title={title}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu.SubMenu>
        )
    }
    renderMenuItem = ({key, title,}) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}>
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        )
    }
    render() {
        return (
            <Menu
                onClick={this.handleClick}
                defaultSelectedKeys='/Login/InformationPage'
                defaultOpenKeys="1"
                mode="inline"
                theme="dark"
            >
                {
                    menus.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu>
        )
    }
}
export default CustomMenu;
