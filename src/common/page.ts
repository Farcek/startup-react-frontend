import { RouteProps, Route, Switch } from 'react-router';
import React from 'react';
export type IPageRouter<P = unknown> = RouteProps & {
  // heading: string;
  // path: string;
  // footerPage?: boolean;
} & P;

 
export interface ILoginRouteState {
  appusertoken?: string
  from?: { pathname: string }
}