export interface ISongList {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl?: string;
  coverImgUrl?: string;
  canDislike: boolean;
  trackNumberUpdateTime: number;
  playCount: number;
  trackCount: number;
  highQuality: boolean;
  alg: string;
}
