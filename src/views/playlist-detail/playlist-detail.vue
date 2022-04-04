<template>
  <div class="loading" v-show="store.state.LOADING">
    <van-loading type="spinner" size="30px" color="#0094ff" vertical
      >加载中...</van-loading
    >
  </div>

  <div class="playlist-detail" v-show="!store.state.LOADING">
    <van-sticky @change="handleFixed" z-index="1">
      <top-nav
        :themeVars="themeVars"
        @left-btn="handleBacktrackBtn"
        :class="{ active: isFixed }"
      >
        <template #left>
          <van-icon name="arrow-left" />
        </template>
        <template #center> 推荐歌单 </template>
        <template #right>
          <van-icon name="search" />
        </template>
      </top-nav>
    </van-sticky>

    <div class="detail-top" :style="imgUrl">
      <div class="cover-detail">
        <div class="cover">
          <img
            :src="playList.playlistDetail.coverImgUrl + '?param=450y450'"
            alt=""
          />
        </div>
        <div class="info">
          <div class="title">
            {{ playList.playlistDetail.name }}
          </div>
          <div class="creator">
            <img
              class="picture"
              :src="playList.playlistDetail.creator?.avatarUrl"
              alt=""
            />
            <div class="name">
              {{ playList.playlistDetail.creator?.nickname }}
            </div>
          </div>
          <div class="description">
            {{ playList.playlistDetail.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="functional-zone">
      <div class="play">
        <div class="play-btn">
          <svg
            t="1648284047110"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6562"
            width="200"
            height="200"
          >
            <path
              d="M69.662 516.461a444.57 452.238 0 1 0 889.14 0 444.57 452.238 0 1 0-889.14 0Z"
              fill="#d81e06"
              p-id="6563"
            ></path>
            <path
              d="M407.56 714.368V303.616l355.722 205.376z"
              fill="#ffffff"
              p-id="6564"
            ></path>
          </svg>
        </div>
        <div>全部播放</div>
        <span class="num">(999)</span>
      </div>
    </div>
    <div class="songs">
      <template v-for="(song, index) in playList.songs" :key="song.id">
        <div class="song" @click="handleSong(index)">
          <div class="serial-num">{{ index + 1 }}</div>
          <div class="pic">
            <img
              class="headx"
              :src="`${song.al.picUrl}?param=100y100`"
              alt=""
            />
            <img
              class="wave"
              width="20"
              height="20"
              src="@/assets/images/wave.gif"
              alt=""
              data-index="0"
            />
          </div>
          <div class="info">
            <div class="music-name">{{ song.name }}</div>
            <div class="framer">
              <span v-for="(ar, i) in song.ar" :key="ar.id">{{
                song.ar[i + 1] ? ar.name + "&nbsp;/&nbsp;" : ar.name
              }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { useStore } from "vuex";
import { useStore } from "@/store";
import TopNav from "@/components/top-nav";
name: "playlist-detail";

const route = useRoute();
const router = useRouter();
const store = useStore();
console.log(route.params.id);
store.dispatch("playlist/getPlaylistData", {
  id: route.params.id,
});
console.log(route.params.id);

const playList = computed(() => {
  return store.state.playlist;
});
const imgUrl = computed(() => {
  playList.value.playlistDetail.coverImgUrl;
  return {
    backgroundImage:
      "url(" +
      store.state.playlist.playlistDetail.coverImgUrl +
      "?param=450y450 )",
    backgroundSize: "100% 200px",
  };
});
// 导航条样式
const themeVars = {
  color: "#fff",
  fontSize: "18px",
};

// 点击返回按钮时触发
const handleBacktrackBtn = (e: any) => {
  // 返回上一级
  router.back();
};
// 点击歌曲触发
const handleSong = (index: number) => {
  store.commit("playlist/changeSongCurrent", index);
};

// 头部导航吸顶时触发
const isFixed = ref(false);
const handleFixed = (bool: boolean) => {
  isFixed.value = bool;
  console.log(bool);
};
</script>

<style lang="less" scoped>
.loading {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.playlist-detail {
  .detail-top {
    width: 100%;
    position: relative;
    height: 400px;
    z-index: -1;
    overflow: hidden;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
  }
  .detail-top::after {
    content: "";
    width: 100%;
    height: 400px;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: saturate(180%) blur(70px);
  }
  ::v-deep(.active) {
    background-color: #fff;
    color: #000 !important;
  }
  ::v-deep(.van-hairline--bottom::after) {
    border: none;
  }
  ::v-deep(.van-nav-bar .van-icon) {
    color: #fff;
  }
  ::v-deep(.van-ellipsis) {
    overflow: inherit;
  }
  ::v-deep(.van-nav-bar__arrow) {
    font-size: 36px;
  }
  .cover-detail {
    display: flex;
    justify-content: center;
    height: 240px;
    .cover {
      width: 240px;
      height: 240px;
      img {
        width: 240px;
        height: 240px;
        border-radius: 20px;
      }
    }
    .info {
      width: 440px;
      padding-left: 40px;
      font-size: 30px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 35px;
      }
      .creator {
        display: flex;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .name {
          padding-left: 10px;
          font-size: 16px;
          line-height: 50px;
          color: #d9d9d9;
        }
      }
      .description {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #b9b7b7;
      }
    }
  }

  .functional-zone {
    margin-top: 28px;
    line-height: 50px;
    padding: 0 30px;

    display: flex;
    .play {
      display: flex;
      .play-btn {
        font-size: 50px;
        margin-right: 20px;
      }
      .num {
        font-size: 20px;
        color: #b9b7b7;
        padding-left: 10px;
      }
    }
  }
  .songs {
    padding-top: 20px;
    padding-bottom: 100px;
  }
  .song {
    position: relative;
    overflow: hidden;
    margin-top: 10px;
    display: flex;
    height: 96px;
    border-bottom: 1px solid #e6e6e6;
    .serial-num {
      width: 96px;
      height: 96px;
      text-align: center;
      line-height: 96px;
    }
    .pic {
      position: relative;
      img {
        width: 80px;
        height: 80px;
        border-radius: 15px;
        object-fit: cover;
        margin-right: 25px;
      }
      .wave {
        position: absolute;
        bottom: 20%;
        left: calc(50% - 30px);
        display: none;
      }
    }

    .info {
      width: 60%;
      .music-name {
        font-size: 35px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .framer {
        font-size: 20px;
        color: #949393;
        display: flex;
      }
    }
  }
  .song:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 0.3s, opacity 0.5s;
  }

  .song:active:after {
    transform: scale(0, 0);
    opacity: 0.3;
    transition: 0s;
  }
}
</style>
