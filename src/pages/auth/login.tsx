import React from "react"
import { Route, Link, Redirect, useLocation, RouteChildrenProps } from 'react-router-dom';
import { stateSession } from '../../service/state.session';
import { RestApiAuth } from './api.auth';
import { ILoginRouteState } from 'src/common/page';

interface IState {
    action: 'none' | 'goUserly' | 'process' | 'back2from'
}



export default class PageLogin extends React.Component<RouteChildrenProps<{}, ILoginRouteState>, IState> {
    state = {
        action: 'none'
    } as Readonly<IState>
    async componentDidMount() {
        let routeState = this.props.location.state;
        if (routeState && routeState.appusertoken) {
            this.setState({
                action: 'process'
            });

            let resp = await RestApiAuth.loginByToken({
                appusertoken: routeState.appusertoken
            });

            await stateSession.login(resp.username, resp.sid);

            return this.goBack2From();

        }

        try {
            let cookie = stateSession.getCookie();
            if (cookie.sid && cookie.username) {
                this.setState({
                    action: 'process'
                });
                // let resp = await RestApiAuth.loginBySid({
                //     sid
                // });
                await stateSession.login(cookie.username, cookie.sid);
                return this.goBack2From();
            }
        } catch (error) {
            return this.goUserly()
        }

        this.goUserly()
    }
    goBack2From() {
        this.setState({
            action: 'back2from'
        });
    }
    goUserly() {
        this.setState({
            action: 'goUserly'
        });
    }
    render() {
        let { action } = this.state;
        if (action == 'goUserly') {
            location.href = "https://banner-auth.userly.mn/login?return=http://localhost:9000/login-resolve";
            return <div>...</div>
        }

        if (action == 'process') {
            return <span>login process ...</span>
        }
        if (action == 'back2from') {

            let { location } = this.props;
            let from = location.state?.from || { pathname: '/' };

            return <Redirect to={from} />;
        }

        return <span>login error</span>;
    }
}