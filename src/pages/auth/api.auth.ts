import { RestApi } from 'src/service/api';
import { dtoLoginBySid, dtoLoginByToken } from 'console-dto/login';


export class RestApiAuth {

    static async loginByToken(payload: dtoLoginByToken.IReq) {
        return await RestApi.post<dtoLoginByToken.IRes>('/console/login/token', payload)
    }
 
    static async loginBySid(payload: dtoLoginBySid.IReq) {
        return await RestApi.post<dtoLoginBySid.IRes>('/console/login/sid', payload)
    }
}