<template>
  <div class="singer-card">
    <img :src="`${singer?.img1v1Url}?param=250y250`" alt="" />
    <span>{{ singer?.name }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    singer: any;
  }>(),
  {
    singer: () => ({}),
  }
);
</script>

<style scoped lang="less">
.singer-card {
  width: 33%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  span {
    text-align: center;
    padding-top: 10px;
    font-size: 28px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
