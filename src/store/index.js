import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS_TO_STATE: (state, products) => {
      products.forEach((el) => {
        state.products.push(el);
      });
    },
    DELETE_PRODUCTS: (state, id) => {
      state.products.splice(id, 1);
    },
  },
  actions: {
    async getProduct({ dispatch, commit }, page) {
      return await axios(
        `https://api.punkapi.com/v2/beers?page=${page}&limit=25`,
        {
          method: "GET",
        }
      )
        .then((product) => {
          commit("SET_PRODUCTS_TO_STATE", product.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteProduct({ commit }, id) {
      commit("DELETE_PRODUCTS", id);
    },
  },
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
  },
  modules: {},
});
