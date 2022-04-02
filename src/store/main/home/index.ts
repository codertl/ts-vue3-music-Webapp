import { Module } from "vuex";
import { IHomeStore } from "./types";
import { IRootState } from "../../types";

import {
  getBannerData,
  getHomePageBallIconData,
  getRecommendPlayList,
} from "@/service/main/index";
const HomeModule: Module<IHomeStore, IRootState> = {
  namespaced: true,
  state: {
    bannners: [],
    iconList: [],
    recommendPlayList: [], // 推荐歌单
  },
  mutations: {
    changeBannersData(state, list: any[]) {
      state.bannners = list;
    },
    changeIconListData(state, list: any[]) {
      state.iconList = list;
    },
    changeRecommendPlayListData(state, list: any[]) {
      state.recommendPlayList = list;
    },
  },
  actions: {
    async getPageListAction({ commit }) {
      // 获取banner数据
      const { banners, code: bannerCode } = await getBannerData("2");
      if (bannerCode === 200) {
        commit("changeBannersData", banners);
      }
      // 获取图标列表资源
      const { data, code: iconListCode } = await getHomePageBallIconData();
      if (iconListCode === 200) {
        commit("changeIconListData", data);
      }
      // 获取推荐歌单数据
      const { result, code: recommendPlayListCode } =
        await getRecommendPlayList();
      if (recommendPlayListCode === 200) {
        commit("changeRecommendPlayListData", result);
      }
    },
  },
};
export default HomeModule;
