import React from "react"
import { Route, Link, Redirect } from 'react-router-dom';
import { stateSession } from '../../service/state.session';



export default class PageLogout extends React.Component {
    state = {
        redirectToReferrer: false
    }
    async componentDidMount(){
       await stateSession.logout();
        this.setState({
            redirectToReferrer: true
        });
    }
    render() {
        
        const { redirectToReferrer } = this.state


        if (redirectToReferrer === true) {
            return <Redirect to={'/'} />
        }
        return <div style={{ padding: '2rem' }}>
            <p>processing ...</p>
        </div>;
    }
}