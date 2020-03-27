import loadable from '@loadable/component';
import React from 'react';
import { IPageRouter } from './common/page';

const fallback = <div>loading....</div>;

const PageHome = loadable(() => import(/* webpackChunkName: "page-home" */ "./pages/home"), { fallback, });

const PageContact = loadable(() => import(/* webpackChunkName: "page-contact" */"./pages/contact"), { fallback });
const PageService = loadable(() => import(/* webpackChunkName: "page-service" */"./pages/service"), { fallback });

export const routes: IPageRouter[] = [
    {path : "/",  component : PageHome, exact:true, },
    {path : "/contact", component : PageContact },
    // {path : "/contact/:id", component : PageContact, exact:true, },
    {path : "/service", component : PageService, },
];