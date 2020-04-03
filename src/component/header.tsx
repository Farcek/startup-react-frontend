import React from "react";

import styles from "./header.m.scss";
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { stateSession } from '../service/state.session';


@observer
export default class HeaderComponent extends React.Component {
    
    render() {
        
        return <div className={styles.header}>
            <div className={styles.line1}>
                <div style={{ float: 'right' }}>
                    {stateSession.isAuthenticated
                        ? <span>hi {stateSession.username} <Link to="/logout">logout</Link> </span>
                        : <Link to="/login">login</Link>
                    }
                </div>
                <div>Userly bannering system</div>
            </div>
            <div className={styles.line2}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/customer" className={styles.link}>Customer</Link>
                <Link to="/contact" className={styles.link}>contact</Link>
                <Link to="/service" className={styles.link}>Service</Link>
                <Link to="/404" className={`${styles.link} test`}>404</Link>
            </div>
        </div>;
    }
}