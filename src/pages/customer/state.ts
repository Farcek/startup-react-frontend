
import { observable } from 'mobx'


interface CustomerItem{
    name: string, desc: string
}

export class CustomerState {
    @observable frmData:CustomerItem = { name: 'aadsd', desc: ' dsdsddsdsdd ---' };
    

    


    async login() {
        
    }

    async logout() {
       
    }
}


// export const customerState = new CustomerState();