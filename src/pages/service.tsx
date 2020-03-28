import React from "react"
import { Route } from 'react-router';
import loadable from '@loadable/component';
import { Link } from 'react-router-dom';


const fallback = <div>loading....</div>;

// const ServiceA = loadable(() => import(/* webpackChunkName: "service-a" */ "./service.a"), { fallback, });
// const ServiceB = loadable(() => import(/* webpackChunkName: "service-a" */ "./service.b"), { fallback, });
import ServiceA from './service.a';
import ServiceB from './service.b';
// const ServiceB = loadable(() => import(/* webpackChunkName: "service-a" */ "./service.b"), { fallback, });
export default class PageService extends React.Component {

    render() {
        return <div>
            <h1>Service component</h1>

            <div>
                <div>
                    <Link to="service/a" className={``}>AA</Link>
                    <Link to="service/b" className={``}>BB</Link>
                </div>
                <div>
                    <Route exact path={`/service/a`} component={ServiceA} />
                    <Route exact path={`/service/b`} component={ServiceB} />
                </div>
            </div>

        </div>;
    }
}
