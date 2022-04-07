export interface IBannerType {
  banners: any[];
  code: number;
}
export interface IBallIconType {
  code: number;
  data: any[];
  message: string;
}

// 推荐歌单接口返回数据集类型
export interface IrecommendPlayType {
  hasTaste: boolean;
  code: number;
  category: number;
  result: any[];
}

// 歌单列表接口返数据类型
export interface IPlaylistDetailType {
  songs: [];
  privileges: [];
  code: number;
}
// 精品歌单
export interface ISongListHighquality {
  cat: string;
  limit: number | string;
  before: number | string;
}

export interface ISearchType {
  keywords: string;
  limit: number;
  type: number;
}
