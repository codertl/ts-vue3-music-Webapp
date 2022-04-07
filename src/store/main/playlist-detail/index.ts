import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { IPlaylistStore } from "./types";
import localCache from "@/utils/local-cache";
import {
  getPlaylist,
  getPlaylistDetail,
  getPlaylistDetailDynamic,
  getLyric,
  getSearchList,
  getSongDetail,
} from "@/service/main/index";
import { ISearchType } from "@/service/main/index/types";
const playlistModule: Module<IPlaylistStore, IRootState> = {
  namespaced: true,
  state: {
    songs: [], // 歌曲播放列表
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
    searchSongList: [], // 搜索歌曲数据
    searchSingerList: [], // 搜索歌手数据
    searchPlaylist: [], // 搜索歌单数据
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
      state.songs = localCache.getCache("songs") ?? [
        {
          name: "New Boy",
          id: 1857630559,
          ar: [
            {
              id: 1050282,
              name: "房东的猫",
              tns: [],
              alias: [],
            },
            {
              id: 12789956,
              name: "陈婧霏",
              tns: [],
              alias: [],
            },
          ],
          al: {
            name: "谁是宝藏歌手 第8期",
            picUrl:
              "https://p2.music.126.net/KkrcSwKbRsd8GuaOHILlxA==/109951166077317301.jpg",
          },
        },
      ];
    },
    changeLyric(state, lyric) {
      state.lyric = lyric;
    },
    changeSearchSongList(state, list) {
      state.searchSongList = list;
    },
    changeSearchSingerList(state, list) {
      state.searchSingerList = list;
    },
    changeSearchPlaylist(state, list) {
      state.searchPlaylist = list;
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
    // 搜索数据
    async getSearchData({ commit }, payload) {
      const { result } = await getSearchList(payload);
      switch (payload.type) {
        case 1:
          // [1421191783,516823132,1431089706,414706265]
          const ids: any[] = result.songs.map((song: any) => {
            // console.log(song.id);
            return song.id;
          });

          // 1421191783,516823132,1431089706,414706265
          const idsStr = ids.join(",");
          // 获取歌曲详情
          const { songs } = await getSongDetail(idsStr);
          commit("changeSearchSongList", songs);
          break;
        case 100:
          commit("changeSearchSingerList", result.artists);
          break;
        case 1000:
          commit("changeSearchPlaylist", result.playlists);
          break;
        default:
      }
    },
  },
};

export default playlistModule;
