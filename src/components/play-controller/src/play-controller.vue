<template>
  <div class="play-controller">
    <div class="left" @click.capture="handleControl">
      <img :src="songMsg?.al.picUrl + '?param=100y100'" alt="" />
      <div class="title">
        <span class="name">{{ songMsg?.name }}</span>
        &nbsp;-&nbsp;
        <span class="creator" v-for="(ar, i) in songMsg?.ar" :key="ar?.id">{{
          songMsg?.ar[i + 1] ? ar.name + "&nbsp;/&nbsp;" : ar.name
        }}</span>
      </div>
    </div>
    <div class="right">
      <!-- 播放暂停按钮 -->
      <div class="play-pause" @click="handlePlayBtn">
        <div class="play" v-if="isPlay">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
        </div>
        <div class="pause" v-else>
          <svg class="icon" aria-hidden="true">
            <use
              xlink:href="#icon-24gf-pause2
"
            ></use>
          </svg>
        </div>
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan1"></use>
      </svg>
    </div>
    <audio
      ref="audioRef"
      :src="`https://music.163.com/song/media/outer/url?id=${songMsg?.id}.mp3`"
      @ended="handleEndCall"
      @durationchange="handleDurationChange"
      @timeupdate="handleTimeUpdate"
    ></audio>
    <play-music-detail
      ref="playMusicDetailRef"
      :isPlay="isPlay"
      @play-or-pause="handlePlayBtn"
      :duration="duration"
      :currentTime="currentTime"
      @dragCurrentTime="handleDragCurrentTime"
    ></play-music-detail>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import PlayMusicDetail from "@/components/play-music-detail";
import { useStore } from "@/store";
const store = useStore();
const audioRef = ref<InstanceType<typeof HTMLAudioElement>>();
const playMusicDetailRef = ref<InstanceType<typeof PlayMusicDetail>>();

// 渲染页面数据
const songMsg = computed(() => {
  const playlist = store.state.playlist;
  console.log(playlist.songs[playlist.songCurrent]);
  return playlist.songs[playlist.songCurrent];
});
// 监听鼠标点击某个歌曲并播放
watch(
  () => store.state.playlist.songCurrent,
  (newval) => {
    setTimeout(() => {
      audioRef.value?.play();
      isPlay.value = false;
    }, 500);
  }
);
// 控制播放 | 暂停按钮的显示隐藏
const isPlay = ref(true);
const handlePlayBtn = () => {
  if (audioRef.value!.paused) {
    audioRef.value?.play();
    isPlay.value = false;
  } else {
    audioRef.value?.pause();
    isPlay.value = true;
  }
};

// 歌曲结束调用
const handleEndCall = () => {
  // 当前播放歌曲的下标
  const songCurrent = computed(() => store.state.playlist.songCurrent);
  const current = ref(0);
  // 歌单列表
  const songs = computed(() => store.state.playlist.songs);
  if (songCurrent.value < songs.value.length - 1) {
    current.value = songCurrent.value + 1;
    store.commit("playlist/changeSongCurrent", current.value);
  } else {
    store.commit("playlist/changeSongCurrent", 0);
  }
  console.log("歌曲结束");
};

// 点击歌曲控制器
const handleControl = () => {
  playMusicDetailRef.value!.playMusicDetailRef?.classList.add("active");
};

// 歌曲时长
const duration = ref(0);
const handleDurationChange = (e: any) => {
  duration.value = audioRef.value!.duration;
  console.log(duration.value);

  // 请求歌词
  store.dispatch("playlist/getLyricData", {
    id: songMsg.value.id,
  });
};
// 歌曲播放进度
const currentTime = ref(0);
const handleTimeUpdate = (e: any) => {
  currentTime.value = audioRef.value!.currentTime;
};

// 实现拖拽进度条切换进度
const handleDragCurrentTime = (currentTime: number) => {
  audioRef.value!.currentTime = currentTime;
};
</script>

<style lang="less" scoped>
.play-controller {
  padding: 0 30px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: rgb(246, 246, 246);
  border-top: 1px solid #ebebeb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    flex: 1;
    display: flex;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .title {
      margin-left: 15px;
      line-height: 80px;
      font-size: 28px;
      .creator {
        font-size: 20px;
        color: #7a7a7a;
      }
    }
  }
  .right {
    width: 100px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
