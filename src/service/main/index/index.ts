import { tlRequest } from "@/service";
import store from "@/store";
import {
  IBannerType,
  IBallIconType,
  IrecommendPlayType,
  IPlaylistDetailType,
  ISongListHighquality,
} from "./types";
// 获取轮播图的请求,type:资源类型,对应以下类型,默认为 0 及pc
// 1. android  2. iphone 3. ipad
export function getBannerData(type: string = "0") {
  return tlRequest.get<IBannerType>({
    url: `/banner?type=${type}`,
  });
}

// 获取首页圆形图标列表
export function getHomePageBallIconData() {
  return tlRequest.get<IBallIconType>({
    url: "/homepage/dragon/ball",
  });
}

/**
 * // 获取 推荐歌单
 * @param limit 是返回条数，默认6条
 * @returns
 */
export function getRecommendPlayList(limit: number = 10) {
  return tlRequest.get<IrecommendPlayType>({
    url: `/personalized?limit=${limit}`,
  });
}

/**
 * 获取歌单列表数据
 */
export function getPlaylist(id: string) {
  return tlRequest.get<IPlaylistDetailType>({
    url: `/playlist/track/all?id=${id}`,
  });
}

/**
 * 获取歌单详情
 */
export function getPlaylistDetail(id: string) {
  return tlRequest.get<any>({
    url: `/playlist/detail?id=${id}`,
  });
}

/**
 * 获取歌单详情动态数据
 * 评论数 分享数 收藏数 播放数 ...
 */
export function getPlaylistDetailDynamic(id: string) {
  return tlRequest.get<any>({
    url: `/playlist/detail/dynamic?id=${id}`,
  });
}

/**
 * 获取音乐地址
 */

export function getSongUrl(id: number) {
  return tlRequest.get<any>({
    url: `/song/url?id=${id}`,
  });
}

/**
 * 获取音乐歌词
 *
 */

export function getLyric(id: number) {
  return tlRequest.get<any>({
    url: `/lyric?id=${id}`,
  });
}

/**
 * 调用此接口,可获取精品歌单
 * @param params 是object 参数 cat:标签 ，limit：取出歌单数量，before：分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 *
 */
export function getSongListHighquality(params: ISongListHighquality) {
  const { cat, limit, before } = params;
  return tlRequest.get<any>({
    url: `/top/playlist/highquality?cat=${cat}&limit=${limit}&before=${before}`,
  });
}
