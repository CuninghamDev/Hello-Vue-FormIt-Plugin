import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let store = {
  strict: true,
  state: {
    testData: "Test",
    width: 1,
    height: 1,
    length: 1,
  },
  mutations: {
    changeTestData(state, n) {
      state.testData = n;
    },
    setState(state, n) {
      state[n.storeKey] = n.newValue;
    },
  },
  getters: {
    capitalizedTestData(state) {
      return state.testData.toUpperCase();
    },
  },
};

export default new Vuex.Store(store);
