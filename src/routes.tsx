import loadable from '@loadable/component';
import React from 'react';
import { IPageRouter } from './common/page';

const fallback = <div>loading....</div>;



const PageContact = loadable(() => import(/* webpackChunkName: "page-contact" */"./pages/contact"), { fallback });
const PageService = loadable(() => import(/* webpackChunkName: "page-service" */"./pages/service"), { fallback });
const PageCustomer = loadable(() => import(/* webpackChunkName: "page-customer" */"./pages/customer"), { fallback });

export const routes: IPageRouter[] = [
    {path : "/contact", component : PageContact },
    {path : "/customer", component : PageCustomer },
    {path : "/service", component : PageService, },
];