import axios from 'axios'

import { LOAD_ITEM } from './types'

export default {
    async [LOAD_ITEM]({ commit }) {
        const result = await axios.get('http://127.0.0.1:3000')
        commit(LOAD_ITEM, result.data)
    }    
}