import { sleep } from '../common/sleep'
import { observable } from 'mobx'
import { cookies } from './cookie'



class StateSession {
    @observable isAuthenticated: boolean = false;
    @observable username: string = '';

    constructor() {
        // mobx.autorun(() => console.log(this.report));
    }

    appusertoken: string = '';


    async login(username: string, sid?: string) {
        this.username = username;
        this.isAuthenticated = true;

        if (sid) {
            cookies.set('usr', username);
            cookies.set('sid', sid);
        }

    }

    async logout() {
        this.username = '';
        this.isAuthenticated = false;

        cookies.remove('usr')
        cookies.remove('sid')
    }

    getCookie() {
        return {
            username: cookies.get('usr'),
            sid: cookies.get('sid')
        };
    }
}


export const stateSession = new StateSession();