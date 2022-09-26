import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);
const state = {
  isUserLoggenIn: "",
  loggedInUserId: "",
  numOfCategories: "",
  listOfCategories: [],
  lostOfLocstion: [],
};
const getters = {};
const mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload });
  },
  isLoggedInUser(state) {
    let user = localStorage.getItem("user-info");
    if (user) {
      state.isUserLoggenIn = true;
      state.loggedInUserId = JSON.parse(user).id;
    } else {
      state.isUserLoggenIn = false;
    }
  },
  async displayAllCategory(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/categories?userId=${payload.userIdIs}&locarionId=${payload.locationIdIs}`
    );
    // console.log(result);
    if (result.status == 200) {
      // console.log("hello");
      state.listOfCategories = result.data;
      state.numOfCategories = state.listOfCategories.length;
      console.log("state.listOfCategories");
      console.log(state.listOfCategories);
      // console.log(state.numOfCategories);
      // console.log(payload.userIdIs);
    }
  },
  async canUserAccessThisLocation(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/locations?userId=${payload.userIdIs}&id=${payload.locationIdIs}`
    );
    if (result.status == 200) {
      state.lostOfLocstion = result.data;
      if (state.lostOfLocstion.length !== 1) {
        this.commit("redirectTo", payload.redirectToPage);
      }
    }
  },
  async canUserAccessThisCateory(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/categories?userId=${payload.userIdIs}&locarionId=${payload.locationIdIs}&id=${payload.catIdIs}`
    );
    if (result.status == 200) {
      state.lostOfLocstion = result.data;
      if (state.lostOfLocstion.length !== 1) {
        this.commit("redirectTo", payload.redirectToPage);
      }
    }
  },
};
const actions = {
  redirectTo({ commit }, payload) {
    commit("redirectTo", payload.val);
  },
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
