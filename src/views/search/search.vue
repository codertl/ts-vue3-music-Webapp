<template>
  <top-nav
    :centerStyle="{ textAlign: 'left' }"
    :themeVars="{ backgroundColor: '#fff' }"
    @leftBtn="handleLeftBtn"
  >
    <template #left>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-left-1"></use>
      </svg>
    </template>
    <template #center>
      <span>搜索</span>
    </template>
    <template #right>
      <span></span>
    </template>
  </top-nav>
  <div class="search-page">
    <div class="search-box">
      <div class="search">
        <input type="search" v-model="searchKeyword" />
        <div class="search-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </div>
      </div>
      <van-button
        class="btn"
        type="danger"
        size="normal"
        @click="handleSearchBtn"
        >搜索</van-button
      >
    </div>
    <div class="search-history">
      <div class="history">历史</div>
      <div class="search-history-list">
        <span v-for="(name, i) in historyKeywords" :key="i">{{ name }}</span>
      </div>
      <div class="del" @click="handleDelHistory">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>
    </div>
    <div class="teb-list">
      <van-config-provider :theme-vars="themeVars">
        <van-tabs
          @change="handleChange"
          v-model:active="active"
          background="transparent"
          :swipeable="true"
          title-active-color="#EE0A24"
        >
          <van-tab title="单曲">
            <template v-if="songList.length === 0">
              <van-empty image="search" description="无相关歌曲" />
            </template>
            <template v-else>
              <song-card
                v-for="item in songList"
                :key="item.id"
                :song="item"
              ></song-card>
            </template>
          </van-tab>
          <van-tab title="歌手">
            <template v-if="singerList.length === 0">
              <van-empty image="search" description="无相关歌手" />
            </template>
            <template v-else>
              <singer-card
                v-for="singer in singerList"
                :key="singer?.id"
                :singer="singer"
              ></singer-card>
            </template>
          </van-tab>
          <van-tab title="歌单">
            <template v-if="playlist.length === 0">
              <van-empty image="search" description="无相关歌单"
            /></template>
            <template v-else>
              <div class="playlist">
                <playlist-card
                  v-for="item in playlist"
                  :key="item.id"
                  :playlist="item"
                ></playlist-card>
              </div>
            </template>
          </van-tab>
        </van-tabs>
      </van-config-provider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import localCache from "@/utils/local-cache";
import TopNav from "@/components/top-nav";
import PlaylistCard from "./cpn/playlist-card.vue";
import SingerCard from "./cpn/singer-card.vue";
import SongCard from "./cpn/song-card.vue";
const store = useStore();
const router = useRouter();
// 监听左边按钮点击
const handleLeftBtn = (e: any) => {
  router.back();
};

// tab栏样式
const themeVars = {
  tabFontSize: "16px",
  tabLineHeight: "44px",
  tabsLineHeight: "40px",
  tabsBottomBarWidth: "40px",
  tabsBottomBarHeight: "2px",
};

// searchKeyword
const searchKeyword = ref("");

// 历史搜索
const historyKeywords = ref<string[]>([]);
historyKeywords.value = localCache.getCache("keywords") ?? [];

// 删除历史记录
const handleDelHistory = () => {
  console.log(1);
  localCache.deleteCache("keywords");
  historyKeywords.value = localCache.getCache("keywords") ?? [];
};
// 点击搜索按钮时触发
const handleSearchBtn = () => {
  if (!searchKeyword.value) return;
  let str = JSON.stringify(localCache.getCache("keywords"));
  if (str === undefined || str.indexOf(searchKeyword.value) === -1) {
    historyKeywords.value.push(searchKeyword.value);
    localCache.setCache("keywords", historyKeywords.value);
    historyKeywords.value = localCache.getCache("keywords");
  }
  store.dispatch("playlist/getSearchData", {
    keywords: searchKeyword.value.trim(),
    limit: 30,
    type: 1,
  });
};

// 歌曲数据
const songList = computed(() => store.state.playlist.searchSongList);
// 歌手数据
const singerList = computed(() => store.state.playlist.searchSingerList);
// 歌单数据
const playlist = computed(() => store.state.playlist.searchPlaylist);

// tab栏
const active = ref(0);

// tab栏切换请求相关数据
const handleChange = (num: number) => {
  if (!searchKeyword.value) return;
  if (num === 1 && singerList.value.length === 0) {
    store.dispatch("playlist/getSearchData", {
      keywords: searchKeyword.value.trim(),
      limit: 30,
      type: 100,
    });
  } else if (num === 2 && playlist.value.length === 0) {
    store.dispatch("playlist/getSearchData", {
      keywords: searchKeyword.value.trim(),
      limit: 30,
      type: 1000,
    });
  }
};
</script>

<style scoped lang="less">
.search-page {
  padding: 100px 40px;
  .search-box {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    .search {
      flex: 1;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        border: none;
        padding-left: 50px;
      }
      .search-icon {
        position: absolute;
        top: calc(50% - 16px);
        left: 10px;
      }
    }
    .btn {
      margin-left: 20px;
      width: 120px;
      height: 60px;
    }
  }
  .search-history {
    padding: 40px 0;
    display: flex;
    position: relative;
    .history {
      padding-right: 20px;
    }
    .del {
      position: absolute;
      top: calc(50% - 18px);
      right: 0;
    }
    .search-history-list {
      width: 540px;
      display: flex;
      align-items: center;
      overflow-y: hidden;
      overflow-x: scroll;
      font-size: 22px;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */

      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      span {
        display: inline-block;
        background-color: #fff;
        padding: 4px 20px;
        margin-right: 10px;
        border-radius: 5px;
        white-space: nowrap;
      }
    }
  }
  ::v-deep(.van-tabs__wrap) {
    font-weight: 600 !important;
  }
  ::v-deep(.van-tab--active) {
    font-weight: 600 !important;
  }
  ::v-deep(.van-tabs__content) {
    padding-top: 20px;
  }
}
.playlist {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(2, 320px);
}
</style>
