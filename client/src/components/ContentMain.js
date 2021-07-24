import React from 'react'
//引入路由
import {Route, Switch} from 'react-router-dom'

class ContentMain extends React.Component {
    //all pages should be register here
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/Login/InformationPage' component={global.information}/>
                    <Route exact path='/Login/IssuerLogin' component={global.issuer}/>
                    <Route exact path='/Login/InvestorLogin' component={global.investor}/>
                    <Route exact path='/Login/RegulatorLogin' component={global.regulator}/>
                    <Route exact path='/Login/VerifierLogin' component={global.verifier}/>
                    <Route exact path='/BondIssuing/IssuePage' component={global.issue}/>
                    <Route exact path='/BondIssuing/IssueSuccess' component={global.success}/>
                    <Route exact path='/BondChecking/CheckBond' component={global.check}/>
                    <Route exact path='/BondChecking/GreenFeature' component={global.green}/>
                    <Route exact path='/BondPurchase/BondDisplay' component={global.display}/>
                    <Route exact path='/BondPurchase/PurchasePage' component={global.purchase}/>
                    <Route exact path='/BondPurchase/TransferPage' component={global.transfer}/>
                </Switch>
            </div>
        )
    }
}

export default ContentMain;
