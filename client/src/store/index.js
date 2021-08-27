import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    invoices: [],
  },
  mutations: {
    ALL_INVOICES(state, payload) {
      state.invoices = payload;
    },
    SET_INVOICE(state, payload) {
      const data = {
        ...payload,
        product_details: JSON.stringify(payload.product_details),
      };
      state.invoices = [...this.state.invoices, data];
    },
  },
  actions: {
    async getInvoices({ commit }) {
      try {
        const { data: res } = await axios.get(
          "http://localhost:3000/api/invoices"
        );
        commit("ALL_INVOICES", res.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getAllInvoices(state) {
      return state.invoices;
    },
  },
});
