import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import visCommon from './modules/vis-common'
import i2 from './modules/i2'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    visCommon,
    i2,
  },
})
