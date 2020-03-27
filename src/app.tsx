import React from "react"

import { Switch, Route, Link } from "react-router-dom"
import { routes } from './routes'
import PageNotfound from './pages/notfound'
import HeaderComponent from './component/header'

import css from './style/main.css';
console.log('css',css)
export default class AppMain extends React.Component {
    render() {
        return <div>
            <HeaderComponent />

            <div>
                <Link to="/">Home</Link>
                <Link to="/contact">contact</Link>
                <Link to="/404">404</Link>
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
