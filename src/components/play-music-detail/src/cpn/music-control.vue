<template>
  <div class="control">
    <!-- 循环 -->
    <svg class="icon" aria-hidden="true">
      <use
        xlink:href="#icon-caozuo-xunhuan1
"
      ></use>
    </svg>
    <!-- 上一首 -->
    <svg class="icon" aria-hidden="true" @click="handlePreviousMusic">
      <use
        xlink:href="#icon-shangyishoushangyige
"
      ></use>
    </svg>

    <!-- 播放 -->
    <div class="play-pause" @click="handlePlayOrPause">
      <svg class="icon" aria-hidden="true" v-if="isPlay">
        <use
          xlink:href="#icon-bofang1-copy
"
        ></use>
      </svg>
      <svg
        v-else
        t="1648885650038"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5201"
        width="200"
        height="200"
      >
        <path
          d="M309.3 130.7h-70.9c-24.3 0-44 19.7-44 44v674.5c0 24.3 19.7 44 44 44h70.9c24.3 0 44-19.7 44-44V174.7c0-24.3-19.7-44-44-44z m476.3 0h-70.9c-24.3 0-44 19.7-44 44v674.5c0 24.3 19.7 44 44 44h70.9c24.3 0 44-19.7 44-44V174.7c0-24.3-19.7-44-44-44z"
          p-id="5202"
          fill="#ffffff"
        ></path>
      </svg>
    </div>
    <!-- 下一首 -->
    <svg class="icon" aria-hidden="true" @click="handleNextMusic">
      <use
        xlink:href="#icon-xiayigexiayishou
"
      ></use>
    </svg>
    <!-- 歌单列表 -->
    <svg class="icon" aria-hidden="true">
      <use
        xlink:href="#icon-gedan1
"
      ></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { ref, computed } from "vue";
const props = defineProps<{
  isPlay: boolean;
}>();
const store = useStore();
const songs = computed(() => store.state.playlist.songs);
const songCurrent = computed(() => store.state.playlist.songCurrent);
const emit = defineEmits(["playOrPause"]);
//暂停或播放
const handlePlayOrPause = () => {
  emit("playOrPause");
};

// 上一首
const handlePreviousMusic = () => {
  console.log("up");
  if (songCurrent.value === 0) {
    store.commit("playlist/changeSongCurrent", songs.value.length - 1);
  } else {
    const num = songCurrent.value - 1;
    store.commit("playlist/changeSongCurrent", num);
  }
};
// 下一首
const handleNextMusic = () => {
  console.log("next");
  if (songCurrent.value === songs.value.length - 1) {
    store.commit("playlist/changeSongCurrent", 0);
  } else {
    const num = songCurrent.value + 1;
    store.commit("playlist/changeSongCurrent", num);
  }
};
</script>

<style scoped>
.control {
  color: #fff;
  font-size: 50px;
  padding: 60px 80px;
  display: flex;
  justify-content: space-between;
}
</style>
