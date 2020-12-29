import { GET_ADS } from './types'
import api from 'api'
export default {
    async [GET_ADS]({commit}){
        const result = await api.getPositionAds({ position:2}) 
        commit(GET_ADS, result.data)
    }
}