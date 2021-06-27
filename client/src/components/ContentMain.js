import React from 'react'
//引入路由
import {Route, Switch} from 'react-router-dom'

class ContentMain extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/Login/InformationPage' component={global.information}/>
                    <Route exact path='/Login/IssuerLogin' component={global.issuer}/>
                    <Route exact path='/Login/InvestorLogin' component={global.investor}/>
                    <Route exact path='/Login/Regulator' component={global.regulator}/>
                    <Route exact path='/BondIssuing/IssuePage' component={global.issue}/>
                </Switch>
            </div>
        )
    }
}

export default ContentMain;
