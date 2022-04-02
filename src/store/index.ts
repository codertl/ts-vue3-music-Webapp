import { createStore, useStore as baseUseStore, Store } from "vuex";
import { IRootState, IStoreType } from "./types";
import home from "./main/home";
import playlist from "./main/playlist-detail";
const store = createStore<IRootState>({
  state() {
    return {
      count: 0,
      LOADING: false,
    };
  },
  modules: {
    home,
    playlist,
  },
  mutations: {
    showLoading(state) {
      state.LOADING = true;
    },
    hideLoading(state) {
      state.LOADING = false;
    },
  },
  actions: {},
});
export function setupStore() {
  store.commit("playlist/initState");
}
// 定义自己的 `useStore` 组合式API
export function useStore(): Store<IStoreType> {
  return baseUseStore();
}

export default store;
