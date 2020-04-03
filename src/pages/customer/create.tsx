import React from "react"


import { observer, inject } from 'mobx-react';
import CustomerComponentForm, { IData } from './component.form';
import { CustomerState } from './state';
import * as mobx from 'mobx';


@inject('customerState') @observer 
export default class PageCustomerCreate extends React.Component<{ customerState: CustomerState }> {

    doCreate(d: IData) {
        let { customerState } = this.props;
        customerState.frmData = d;
    }

   


    render() {
        let { customerState } = this.props;
        return <div>
            <div>name: {customerState.frmData.name}</div>
            <div>desc: {customerState.frmData.desc}</div>
            <CustomerComponentForm data={customerState.frmData} onSubmit={(d)=>this.doCreate(d)} />
        </div>;
    }
}