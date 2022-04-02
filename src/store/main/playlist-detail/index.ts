import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { IPlaylistStore } from "./types";
import localCache from "@/utils/local-cache";
import {
  getPlaylist,
  getPlaylistDetail,
  getPlaylistDetailDynamic,
  getLyric,
} from "@/service/main/index";
const playlistModule: Module<IPlaylistStore, IRootState> = {
  namespaced: true,
  state: {
    songs: [], // 歌单所有歌曲
    playlistDetail: {}, // 歌单详情
    playlistDetailDynamic: {
      commentCount: 0,
      shareCount: 0,
      playCount: 0,
      bookedCount: 0,
      subscribed: false,
      remarkName: null,
      followed: false,
      remixVideo: null,
      code: 200,
    }, // 歌单详情动态 播放数、评论数...
    song: [],
    songCurrent: 0,
    lyric: "",
  },
  mutations: {
    changeSongs(state, list) {
      state.songs = list;
    },
    changePlaylistDetatl(state, list) {
      state.playlistDetail = list;
    },
    changePlaylistDynamic(state, list) {
      state.playlistDetailDynamic = list;
    },
    changeSong(state, list) {
      state.song = list;
    },
    changeSongCurrent(state, value) {
      state.songCurrent = value;
    },
    initState(state) {
      state.songs = localCache.getCache("songs") ?? [];
    },
    changeLyric(state, lyric) {
      state.lyric = lyric;
    },
  },
  actions: {
    async getPlaylistData({ commit }, payload) {
      // 获取歌单详情
      const { playlist } = await getPlaylistDetail(payload.id);
      commit("changePlaylistDetatl", playlist);

      // 获取歌单详情动态
      const detatl = await getPlaylistDetailDynamic(payload.id);
      commit("changePlaylistDynamic", detatl);

      // 歌单所有歌曲列表
      const { songs } = await getPlaylist(payload.id);
      commit("changeSongs", songs);
      // 本地存储歌曲列表
      localCache.setCache("songs", songs);
    },
    async getLyricData({ commit }, payload) {
      const { lrc } = await getLyric(payload.id);
      commit("changeLyric", lrc.lyric);
    },
  },
};

export default playlistModule;
