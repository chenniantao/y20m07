import { GET_ADS } from './types'
export default {
    [GET_ADS](state,payload){
        state.ads = payload
    }    
}