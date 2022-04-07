<template>
  <div class="playlist-card">
    <div class="playlist-cover">
      <img :src="`${playlist?.coverImgUrl}?param=300y300`" alt="" />
    </div>
    <div class="playlist-num">
      <svg class="icon" aria-hidden="true">
        <use
          xlink:href="#icon-bofang1
"
        ></use>
      </svg>
      <span>{{ tranNumber(playlist.playCount) }}</span>
    </div>
    <div class="playlist-name">{{ playlist.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { tranNumber } from "@/utils/tran-number";
const props = withDefaults(
  defineProps<{
    playlist: any;
  }>(),
  { playlist: () => ({}) }
);
</script>

<style scoped lang="less">
.playlist-card {
  display: inline-flex;
  flex-direction: column;
  padding-bottom: 50px;
  .playlist-cover {
    width: 300px;
    height: 300px;
    img {
      width: 300px;
      height: 300px;
      border-radius: 20px;
    }
  }
  .playlist-num {
    font-size: 20px;
    color: rgb(146, 146, 146);
    margin-top: 10px;
    span {
      padding-left: 10px;
    }
  }
  .playlist-name {
    font-size: 26px;
    font-weight: 600;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>
