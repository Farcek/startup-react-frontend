import { RouteProps, Route, Switch } from 'react-router';
export type IPageRouter<P = unknown> = RouteProps & {
    // heading: string;
    // path: string;
    // footerPage?: boolean;
  } & P;