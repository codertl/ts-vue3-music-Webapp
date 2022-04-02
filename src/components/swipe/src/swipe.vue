<template>
  <div class="banner p-15">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <template v-for="item in banners" :key="item.targetId">
        <van-swipe-item><img :src="item.pic" alt="" /></van-swipe-item>
      </template>
    </van-swipe>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  banners: any[];
}>();
</script>

<style scoped lang="less">
.banner {
  background-color: #f7f8fa;
  width: 100%;
  margin-top: 10px;
}
.my-swipe {
  width: 100%;
  border-radius: 20px;
  height: 260px;
  ::v-deep(.van-swipe__indicator) {
    width: 16px;
    height: 4px;
    border-radius: 30px;
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 300px;
  text-align: center;
  background-color: #39a9ed;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
