import React from "react";

import styles from "./header.m.css";
import { Link } from 'react-router-dom'; 
import logo from './logo.png'; 


export default class HeaderComponent extends React.Component {
    render() {
        return <div className={styles.header}>
            <div style={{display:'inline-block'}}>
                <img width="20px" src={logo} alt="logo.img"/>
            </div>
            <Link to="/" className={styles.link}>Home</Link>
            <Link to="/contact" className={styles.link}>contact</Link>
            <Link to="/service" className={styles.link}>Service</Link>
            <Link to="/404" className={`${styles.link} test`}>404</Link>
        </div>;
    }
}