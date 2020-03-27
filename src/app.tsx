import React from "react"

import { Switch, Route, Link } from "react-router-dom"
import { routes } from './routes'
import PageNotfound from './pages/notfound'
import HeaderComponent from './component/header'

import './style/main.g.css';

export default class AppMain extends React.Component {
    render() {
        return <div>
            <HeaderComponent />
            <div>
                
                <Switch>
                    {routes.map((route, i) => {
                        return <Route key={i} exact={route.exact} path={route.path} component={route.component} />
                    })}
                    <Route><PageNotfound /></Route>
                </Switch>
            </div>
        </div>
    }
}
