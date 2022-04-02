<template>
  <div class="card">
    <div class="title p-15">
      <div class="title-left">推荐歌单</div>
      <div class="title-right">
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
      <template v-for="song in songList" :key="song.id">
        <div class="item" @click="handleSongList(song.id)">
          <div class="cover-img">
            <img :src="song.picUrl" :alt="song.name" />
          </div>
          <div class="cover-name">{{ song.name }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ISongList } from "./type";
import { useStore } from "@/store";

const props = defineProps<{
  songList: ISongList[];
}>();
const store = useStore();
const router = useRouter();
// 点击某个歌单触发的事件
const handleSongList = (id: number) => {
  // 实现路由跳转
  router.push({
    name: "歌单详情",
    params: {
      id,
    },
  });
  store.commit("playlist/changeSongCurrent", 0);
};
</script>

<style lang="less" scoped>
.card {
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
        width: 220px;
        height: 220px;
        img {
          width: 100%;
          border-radius: 15px;
        }
      }
      .cover-name {
        color: #7e7979;
        font-size: 20px;
        width: 220px;
        height: 60px;
        white-space: nowrap;
        /*溢出部分文字隐藏*/
        overflow: hidden;
        /*溢出部分省略号处理*/
        text-overflow: ellipsis;
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
