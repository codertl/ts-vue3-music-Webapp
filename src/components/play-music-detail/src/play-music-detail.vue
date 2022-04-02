<template>
  <div
    class="play-music-detail"
    ref="playMusicDetailRef"
    v-touch:swipedown="handleSwipeDown"
    :style="{ backgroundImage: `url(${songMsg?.al.picUrl}?param=800y800)` }"
  >
    <div class="play-bg">
      <div class="down" @click="handleSwipeDown">
        <div class="down-line"></div>
      </div>

      <div class="cover" @click="isLyric = true" v-show="!isLyric">
        <img
          class="needle"
          :class="{ active: !isPlay }"
          ref="needleRef"
          src="@/assets/images/needle.png"
          alt=""
        />
        <div class="cover-img">
          <div class="el-img" :class="{ active: !isPlay }">
            <img :src="`${songMsg?.al.picUrl}?param=800y800`" alt="" />
          </div>
        </div>
      </div>
      <div
        class="lyrics"
        ref="lyricsRef"
        v-show="isLyric"
        @click="isLyric = false"
      >
        <div style="height: 100%">
          <ul class="c" ref="cRef">
            <li
              class="lyric"
              v-for="(item, i) in lyricsObjArr"
              :style="{
                color: lyricIndex === i ? 'skyblue' : '#ded9d9',
              }"
              :data-index="i"
              :key="item.uid"
            >
              {{ item.lyric }}
            </li>
          </ul>
        </div>
      </div>
      <div class="control-box">
        <div class="info">
          <div class="song">
            <span class="name">{{ songMsg?.name }}</span>
            <span class="songer">
              <template v-for="(ar, i) in songMsg?.ar" :key="ar?.id">
                {{
                  songMsg?.ar[i + 1] ? ar.name + "&nbsp;-&nbsp;" : ar.name
                }}</template
              >
            </span>
          </div>
          <!-- 进度条 -->
          <div class="progress">
            <span class="time-start">{{ parseTimeString(currentTime) }}</span>
            <div class="line">
              <van-slider
                v-model="currentTime"
                bar-height="4px"
                active-color="#fff"
                class="line"
                min="0"
                :max="duration"
                inactive-color="rgba(255, 255, 255, 0.4)"
                @change="handleSlider"
                step="0.05"
              />
            </div>
            <span class="time-end">{{ parseTimeString(duration) }}</span>
          </div>
        </div>
        <div class="tool">
          <!-- 喜欢 -->
          <svg class="icon" aria-hidden="true">
            <use
              xlink:href="#icon-xihuan
"
            ></use>
          </svg>
          <!-- 下载 -->
          <svg class="icon" aria-hidden="true">
            <use
              xlink:href="#icon-xiazai
"
            ></use>
          </svg>
          <!-- 评论 -->
          <svg class="icon" aria-hidden="true">
            <use
              xlink:href="#icon-pinglun
"
            ></use>
          </svg>
          <!-- 更多 -->
          <svg class="icon" aria-hidden="true">
            <use
              xlink:href="#icon-gengduo-shuxiang
"
            ></use>
          </svg>
        </div>
        <music-control
          :isPlay="isPlay"
          @playOrPause="handlePlayOrPause"
        ></music-control>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useStore } from "@/store";
import MusicControl from "./cpn/music-control.vue";
const props = defineProps<{
  isPlay: boolean;
  duration: number;
  currentTime: number;
}>();
const emit = defineEmits(["playOrPause", "dragCurrentTime"]);

const store = useStore();
const playMusicDetailRef = ref<InstanceType<typeof HTMLDivElement>>();

// 点击下拉按钮 | 下滑
const handleSwipeDown = () => {
  playMusicDetailRef.value?.classList.remove("active");
};

// 渲染页面数据
const songMsg = computed(() => {
  const playlist = store.state.playlist;
  return playlist.songs[playlist.songCurrent];
});

const needleRef = ref<InstanceType<typeof HTMLImageElement>>();

// 播放或暂停按钮
const handlePlayOrPause = () => {
  emit("playOrPause");
};

// 进度条实时触发
const handleSlider = (currentNum: number) => {
  emit("dragCurrentTime", currentNum);
  console.log(currentNum);
};
const sec = ref(0);

// 格式化歌曲时间
const parseTimeString = (num: number) => {
  let min = Math.floor(num / 60);
  let sec = Math.floor(num - min * 60);
  return `${min <= 9 ? "0" + min : min}:${sec <= 9 ? "0" + sec : sec}`;
};

// 解析歌词并自动轮播歌词
const isLyric = ref(false);
const lyricIndex = ref(0);
interface ILyricsObjArr {
  lyric: string;
  time: string;
  uid: string;
}
const lyricsObjArr = ref<ILyricsObjArr[]>([]);
// 格式化音乐歌词
const formatMusicLyric = (lyric: string) => {
  const lyricsObjArr: ILyricsObjArr[] = [];
  // 用正则匹配换行字符对字符串进行分割
  const regNewLine = /\n/;
  const lineArr = lyric.split(regNewLine);
  // console.log(lineArr);

  // 分割时间和歌词
  const regTime = /^\[\d{2}:\d{2}.\d{2,3}\]/;

  lineArr.forEach((item) => {
    if (item === "") return;
    let time: any = item.match(regTime);
    const lyric =
      item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
    time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0;
    const uid = Math.random().toString().slice(-6);
    if (lyric === "") {
      console.log("这一行没有歌词");
    } else {
      lyricsObjArr.push({
        lyric,
        time,
        uid,
      });
    }
  });
  return lyricsObjArr;
};
// 转换时间的函数
const formatLyricTime = (time: any) => {
  // 格式化歌词的时间 转换成 sss:ms
  const regMin = /.*:/;
  const regSec = /:.*\./;
  const regMs = /\./;

  const min = parseInt(time.match(regMin)[0].slice(0, 2));
  let sec = parseInt(time.match(regSec)[0].slice(1, 3));
  const ms = time.slice(
    time.match(regMs).index + 1,
    time.match(regMs).index + 3
  );
  if (min !== 0) {
    sec += min * 60;
  }
  return Number(sec + "." + ms);
};
const cRef = ref<InstanceType<typeof HTMLDivElement>>();
watchEffect(() => {
  props.duration;
  const arr = formatMusicLyric(store.state.playlist.lyric);
  lyricsObjArr.value = arr;
});
watchEffect(() => {
  props.currentTime;
  // 歌词滚动
  for (let i = 0; i < lyricsObjArr.value.length; i++) {
    if (props.currentTime > parseInt(lyricsObjArr.value[i].time)) {
      const el = cRef.value?.children[i] as HTMLDivElement;
      const index = el.dataset.index!;
      if (i === parseInt(index)) {
        lyricIndex.value = i;
        cRef.value!.style.transform = `translateY(${170 - 30 * (i + 1)}px)`;
      }
    }
  }
});

defineExpose({
  playMusicDetailRef,
});
</script>

<style lang="less" scoped>
.play-music-detail {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999;
  top: 100%;
  transition: all 1s;
  left: 0;
  background-size: cover !important;
  background-position: center !important;
  &.active {
    top: 0%;
  }
  .play-bg {
    position: absolute;
    z-index: 1001;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(40px);
    .down {
      width: 100%;
      height: 80px;
      display: flex;
      .down-line {
        width: 100px;
        height: 12px;
        background: rgba(255, 255, 255, 0.8);
        margin: auto;
        border-radius: 6px;
      }
    }
    .cover,
    .lyrics {
      height: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      transition: all 1s;
      img.needle {
        width: 80px;
        position: absolute;
        top: 8%;
        left: calc(50% - 45px);
        transform-origin: top right;
        transform: rotate(298deg);
        transition: all 1s;
        &.active {
          transform: rotate(320deg);
        }
      }
      .cover-img {
        width: 485px;
        height: 485px;
        background-image: url(@/assets/images/disc.986e5ec6.png);
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-img {
          width: 300px;
          height: 300px;
          animation: img-rotate 15s linear infinite;
          animation-play-state: paused;
          &.active {
            animation-play-state: running;
          }
          img {
            width: 300px;
            height: 300px;
            border-radius: 50%;
          }
        }
        @keyframes img-rotate {
          0% {
            -webkit-transform: rotate(10deg);
            transform: rotate(10deg);
          }
          100% {
            -webkit-transform: rotate(370deg);
            transform: rotate(370deg);
          }
        }
      }
    }
    .lyrics {
      height: 50%;
      margin: 66.6px 0;
      overflow: scroll;
      .c {
        text-align: center;
        padding: 0 40px;
      }
      .lyric {
        padding: 10px 0;
      }
    }
    .control-box {
      .info {
        padding: 0 40px;

        .song {
          display: flex;
          flex-direction: column;
          .name {
            color: #fff;
            font-size: 40px;
            font-weight: 900;
            white-space: nowrap;
          }
          .songer {
            color: rgba(255, 255, 255, 0.8);
            font-size: 28px;
            display: flex;
          }
        }
        .progress {
          padding: 30px 0;
          display: flex;
          align-items: center;
          font-size: 20px;
          color: rgba(255, 255, 255, 0.8);
          .line {
            padding: 0 20px;
            flex: 1;
          }
        }
      }
    }
    .tool {
      font-size: 40px;
      display: flex;
      justify-content: space-between;
      padding: 20px 80px;
      .icon {
        color: #fff;
      }
    }
  }
}
</style>
