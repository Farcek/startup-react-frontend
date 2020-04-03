import React from "react"

import { Switch, Route, Link, Redirect } from "react-router-dom"
import { routes } from './routes'
import PageNotfound from './pages/notfound'
import HeaderComponent from './component/header'
import { stateSession } from './service/state.session'
import PageHome from './pages/home'
import PageLogin from './pages/auth/login'
import PageLogout from './pages/auth/logout'
import PageLoginResolve from './pages/auth/login-resolver'

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './style/main.g.css';
import { ILoginRouteState } from './common/page'



export default class AppMain extends React.Component {
    render() {
        return <div>
            <HeaderComponent />
            <div>

                <Switch>
                    <Route path="/" exact render={() => <PageHome />} />

                    {routes.map((route, i) => {
                        return <Route key={i} exact={route.exact} path={route.path} render={(props) => {
                            const C = route.component;
                            if (C) {
                                let state: ILoginRouteState = {
                                    from: props.location
                                }
                                return stateSession.isAuthenticated
                                    ? <C {...props} />
                                    : <Redirect to={{ pathname: '/login', state }} />
                            }
                            return <div>not component <code>const C = route.component;</code></div>
                        }} />
                    })}
                    <Route path="/login" exact component={PageLogin} />
                    <Route path="/login-resolve" exact component={PageLoginResolve} />
                    <Route path="/logout" exact render={props => <PageLogout />} />
                    <Route><PageNotfound /></Route>
                </Switch>
            </div>
        </div>
    }
}
