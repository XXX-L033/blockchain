import Loadable from 'react-loadable'
import Loading from './components/Loading';


global.information = Loadable({
    loader: () => import('./views/Login/InformationPage'),
    loading: Loading,
});

global.issuer = Loadable({
    loader: () => import('./views/Login/IssuerLogin'),
    loading: Loading,
});

global.investor = Loadable({
    loader: () => import('./views/Login/InvestorLogin'),
    loading: Loading,
});

global.regulator = Loadable({
    loader: () => import('./views/Login/RegulatorLogin'),
    loading: Loading,
});

global.issue = Loadable({
    loader: () => import('./views/BondIssuing/IssuePage'),
    loading: Loading,
});

global.success = Loadable({
    loader: () => import('./views/BondIssuing/IssueSuccess'),
    loading: Loading,
});

global.check = Loadable({
    loader: () => import('./views/BondChecking/CheckBond'),
    loading: Loading,
});

global.display = Loadable({
    loader: () => import('./views/BondPurchase/BondDisplay'),
    loading: Loading,
});

global.purchase = Loadable({
    loader: () => import('./views/BondPurchase/PurchasePage'),
    loading: Loading,
});

global.transfer = Loadable({
    loader: () => import('./views/BondPurchase/TransferPage'),
    loading: Loading,
});
