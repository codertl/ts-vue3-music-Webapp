interface IDynamic {
  commentCount: number;
  shareCount: number;
  playCount: number;
  bookedCount: number;
  subscribed: boolean;
  remarkName: null;
  followed: boolean;
  remixVideo: null;
  code: number;
}
export interface IPlaylistStore {
  songs: any[];
  playlistDetail: any;
  playlistDetailDynamic: IDynamic;
  song: any[];
  songCurrent: number;
  lyric: string;
}
