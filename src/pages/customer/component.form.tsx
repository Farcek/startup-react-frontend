







import React, { useState } from "react"
import { Route, Link } from 'react-router-dom';

import Form, {
    Item, SimpleItem, RequiredRule, AsyncRule, StringLengthRule, ButtonItem
} from 'devextreme-react/form';
import { } from 'devextreme-react/form';
import DxForm, { dxFormSimpleItem, dxFormButtonItem, } from 'devextreme/ui/form';
import 'devextreme/ui/text_area';


export interface IData {
    name: string
    desc: string
}

export default class CustomerComponentForm extends React.Component<{ data: IData, onSubmit: (data: IData) => void }> {

   




    items: (dxFormSimpleItem | dxFormButtonItem)[] = [
        { dataField: 'name', isRequired: true, },
        // {
        //     dataField: 'desc', isRequired: true, editorType: "dxTextArea",
        //     editorOptions: {
        //         height: 90,

        //     }, validationRules: [{ type: 'required' }, { type: 'stringLength', min: 5, max: 100 }]
        // },
        {
            dataField: "desc",
            isRequired: true,

            editorType: "dxTextArea",
            editorOptions: {
                placeholder: "Add notes..."
            }
        },
        {
            itemType: "button",
            horizontalAlignment: "left",
            buttonOptions: {
                text: "Register",
                type: "success",
                useSubmitBehavior: true
            }
        }
    ]

    render() {
        let { data } = this.props;
        return <form action="your-action" onSubmit={(e) => {
            e.preventDefault();
     
           
            this.props.onSubmit(data);
        }}>
            {/* <div ref={this.frm}></div> */}
            <Form
                id="form"
                formData={data || {}}
                readOnly={false}
                showColonAfterLabel={true}
                labelLocation={'left'}
                minColWidth={100}
                colCount={2}
                showValidationSummary={true}
                items={this.items}
            />
        </form>
    }
}