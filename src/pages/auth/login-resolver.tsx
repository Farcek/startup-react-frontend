import React from "react"
import { Route, Link, Redirect, } from 'react-router-dom';
import { ILoginRouteState } from 'src/common/page';



export default class PageLoginResolve extends React.Component<{ location: { search?: string } }> {
    state = {
        goLoginDo: false
    }

    appusertoken: string = '';

    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search);
        let appusertoken = query.get('appusertoken');
        if (appusertoken) {
            this.appusertoken = appusertoken;
            this.setState({
                goLoginDo: true
            });
        }
    }
    render() {
        const { goLoginDo } = this.state


        if (goLoginDo === true) {
            let state: ILoginRouteState = {
                appusertoken: this.appusertoken
            }
            return <Redirect to={{ pathname: '/login', state: { ...state } }} />
        }
        return <div style={{ padding: '2rem' }}>
            Login error
        </div>;
    }
}