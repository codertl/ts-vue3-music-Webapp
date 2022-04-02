import { IHomeStore } from "./main/home/types";
import { IPlaylistStore } from "./main/playlist-detail/types";
export interface IRootState {
  count: number;
  LOADING: boolean;
}

export interface IRootWithModule {
  home: IHomeStore;
  playlist: IPlaylistStore;
}

export type IStoreType = IRootState & IRootWithModule;
