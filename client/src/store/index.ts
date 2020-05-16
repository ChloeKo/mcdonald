import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sellers:{},
    orders:{},
    ratings:{}
  },
  getters:{
    getSellers(state){
      return state.sellers
    },
    getOrders(state){
      return state.orders
    },
    getRatings(state){
      return state.ratings
    }
  },
  mutations: {
    setSellers(state,sellers){
      state.sellers = sellers;
    },
    setOrders(state,orders){
      state.orders = orders;
    },
    setRatings(state,ratings){
      state.ratings = ratings;
    }
  },
  actions: {
    setSellers({commit},sellers){
      commit('setSellers',sellers);
    },
    setOrders({commit},orders){
      commit('setOrders',orders);
    },
    setRatings({commit},ratings){
      commit('setRatings',ratings);
    }
  }
})
