<template>
  <div class="icon-list">
    <template v-for="(item, index) in iconDataList" :key="item.id">
      <div class="icon-item">
        <div class="icon">
          <img :src="item.iconUrl" alt="" />
        </div>
        <span>{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ iconDataList: any[] }>();
</script>

<style scoped lang="less">
.icon-list {
  padding-top: 20px;
  font-size: 20px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .icon-item {
    text-align: center;
    margin-right: 45px;
    .icon {
      width: 90px;
      height: 90px;
      margin: auto;
      background-color: #ee0621;
      border-radius: 50%;
      margin-bottom: 10px;
      img {
        width: 90px;
        height: 90px;
      }
    }
  }
  .icon-item:first-child {
    margin-left: 30px;
  }
}
</style>
