import React from "react"
import { Route, Link } from 'react-router-dom';

const SubContact = ({ match }: { match: any }) => <b>Selected Contact: {match.params.id}</b>

export default class PageContact extends React.Component {
    render() {
        return <div>
            <h1>Contact component</h1>
            <ul>
                <li>
                    <Link to="/contact/1">Contact 1 </Link>
                </li>
                <li>
                    <Link to="/contact/2">Contact 2 </Link>
                </li>
                <li>
                    <Link to="/contact/3">Contact 3 </Link>
                </li>
            </ul>
            <Route path="/contact/:id" component={SubContact} />
        </div>;
    }
}