<template>
  <div class="card">
    <div class="title p-15">
      <div class="title-left">{{ name }}</div>
      <div class="title-right" v-if="more">
        更多
        <svg
          t="1648020952742"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3518"
          width="200"
          height="200"
        >
          <path
            d="M364.91 932.46l-70.25-65.41 332.62-357.48-333.06-367.34 71.13-64.47 392.31 432.65-392.75 422.05z"
            p-id="3519"
          ></path>
        </svg>
      </div>
    </div>
    <div class="list">
      <slot>
        <template v-for="song in songList" :key="song.id">
          <div class="item" @click="handleSongList(song.id)">
            <div class="cover-img">
              <img
                :src="
                  song.picUrl
                    ? song.picUrl + '?params=450y450'
                    : song.coverImgUrl + '?params=450y450'
                "
                :alt="song.name"
              />
              <span class="playCount">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofang1-copy"></use>
                </svg>
                <span>{{ tranNumber(song.playCount) }}</span>
              </span>
            </div>
            <div class="cover-name">{{ song.name }}</div>
          </div>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ISongList } from "./type";
import { useStore } from "@/store";
import { tranNumber } from "@/utils/tran-number";
const props = withDefaults(
  defineProps<{
    songList: ISongList[];
    name: string;
    coverUrl: string;
    more?: boolean;
  }>(),
  {
    more: true,
  }
);

const store = useStore();
const router = useRouter();
// 点击某个歌单触发的事件
const handleSongList = (id: number) => {
  // 实现路由跳转
  router.push({
    name: "playlist-detail",
    params: {
      id,
    },
  });
  store.commit("playlist/changeSongCurrent", 0);
};
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 10px;
  background-color: #f7f8fa;
  padding: 25px 0;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .title-left {
      font-size: 40px;
    }
    .title-right {
      border: 3px solid #e7e7e7;
      padding: 4px 20px;
      border-radius: 25px;
      color: #595959;
      font-size: 28px;
    }
  }
  .list {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    .item {
      margin-right: 20px;
      .cover-img {
        position: relative;
        width: 220px;
        height: 220px;
        img {
          width: 100%;
          border-radius: 15px;
        }
        .playCount {
          position: absolute;
          top: 4%;
          right: 4%;
          // width: 90px;
          height: 30px;
          padding: 5px 10px;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 20px;
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          span {
            transform: scale(0.8);
          }
        }
      }
      .cover-name {
        color: #7e7979;
        font-size: 20px;
        width: 220px;
        /*溢出部分文字隐藏*/
        overflow: hidden;
        /*溢出部分省略号处理*/
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .item:first-child {
      margin-left: 30px;
    }
  }
  .list::-webkit-scrollbar {
    display: none;
  }
}
</style>
