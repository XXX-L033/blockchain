import './App.css';

export * from './Routes'
global.menus = [
    {
        title: 'Information',
        icon: 'AlertOutlined',
        key: '/Login/InformationPage',
    }, {
        title: 'Issuer Login',
        icon: 'DiffOutlined',
        key: '/Login/IssuerLogin',
    }, {
        title: 'Investor Login',
        icon: 'UserOutlined',
        key: '/Login/InvestorLogin',
    }, {
        title: 'Regulator Login',
        icon: 'IssuesCloseOutlined',
        key: '/Login/RegulatorLogin',
    },
]
