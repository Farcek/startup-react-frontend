import React from "react"
import { Provider } from 'mobx-react';
import { Route, Link } from 'react-router-dom';

import Box, { Item } from 'devextreme-react/box';
import PageCustomerList from './list';
import PageCustomerCreate from './create';
import { CustomerState } from './state';

export default class PageCustomer extends React.Component {
    customerState = new CustomerState()
    render() {
        return <Provider customerState={this.customerState} >
            <Box direction="row" width="100%">
                <Item ratio={0} baseSize={150}>
                    <ul>
                        <li>
                            <Link to="/customer/create">Create</Link>
                        </li>
                        <li>
                            <Link to="/customer/list">List</Link>
                        </li>

                    </ul>
                </Item>
                <Item ratio={1}>
                    <Route path="/customer/list" component={PageCustomerList} />
                    <Route path="/customer/create" component={PageCustomerCreate} />
                </Item>


            </Box>
        </Provider>
    }
}