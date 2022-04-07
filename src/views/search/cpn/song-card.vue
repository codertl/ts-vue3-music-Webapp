<template>
  <div class="song-card">
    <div class="song-cover">
      <img :src="`${song?.al.picUrl}?param=100y100`" alt="" />
    </div>
    <div class="song-info">
      <span class="song-name">{{ song?.name }}</span>
      <span class="song-creater">
        <span v-for="(ar, i) in song?.ar" :key="ar?.id">
          {{ song?.ar[i + 1] ? ar.name + "&nbsp;/&nbsp;" : ar.name }}
        </span>
        &nbsp;-&nbsp;
        <span>{{ song?.al.name }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    song: any;
  }>(),
  {
    song: () => ({}),
  }
);
</script>

<style scoped lang="less">
.song-card {
  width: 100%;
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid rgba(197, 197, 197, 0.3);
  padding-bottom: 10px;
  margin-bottom: 10px;
  .song-cover {
    width: 90px;
    height: 90px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .song-info {
    flex: 1;
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .song-name {
      font-size: 36px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .song-creater {
      font-size: 26px;
      color: rgb(185, 185, 185);
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
