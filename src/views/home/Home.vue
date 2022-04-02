<template>
  <div class="home">
    <!-- 头部导航栏-->
    <div class="top-nav">
      <top-nav @leftBtn="handleLeftBtn"></top-nav>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <swipe :banners="banners"></swipe>
    </div>
    <!-- 功能滑块 -->
    <div class="icon-list-b">
      <icon-list :iconDataList="iconDataList"></icon-list>
    </div>
    <!-- 推荐 歌单 -->
    <tl-card :songList="recommendPlayList"></tl-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import TopNav from "@/components/top-nav";
import Swipe from "@/components/swipe";
import IconList from "@/components/icon-list";
import TlCard from "@/components/card";
import { useStore } from "@/store";

const store = useStore();
store.dispatch("home/getPageListAction");

// 获取banner数据
const banners = computed(() => {
  return store.state.home.bannners;
});

// 获取图标数据
const iconDataList = computed(() => {
  return store.state.home.iconList;
});

// 获取推荐歌单数据
const recommendPlayList = computed(() => {
  return store.state.home.recommendPlayList;
});

// 触发左侧按钮
const handleLeftBtn = (e: any) => {
  console.log(e);
};
</script>

<style lang="less" scoped>
.icon-list-b {
  background-color: #f7f8fa;
  border-bottom: 0.5px solid #e7e7e7;
  padding-bottom: 24px;
}
.top-nav {
  width: 100%;
  height: 100px;
  position: relative;
}
</style>
