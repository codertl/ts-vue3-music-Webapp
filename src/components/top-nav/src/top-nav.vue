<template>
  <div class="top-nav" :style="themeVars ?? {}">
    <div class="left" @click="leftBtn">
      <slot name="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo1"></use>
        </svg>
      </slot>
    </div>
    <div class="center">
      <slot name="center">
        <div class="search">
          <div class="search_icon">
            <svg class="icon" aria-hidden="true">
              <use
                xlink:href="#icon-sousuo
"
              ></use>
            </svg>
          </div>
          <span class="text">aaa</span>
        </div>
      </slot>
    </div>
    <div class="right" @click="rightBtn">
      <slot name="right">
        <svg class="icon" aria-hidden="true">
          <use
            xlink:href="#icon-luyin
"
          ></use>
        </svg>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  themeVars?: Object;
}>();
const emit = defineEmits(["leftBtn", "rightBtn"]);

// 左边按钮事件
const leftBtn = (e: any) => {
  emit("leftBtn", e);
};

// 右边按钮事件
const rightBtn = (e: any) => {
  emit("rightBtn", e);
};
</script>

<style scoped lang="less">
.top-nav {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  position: absolute;
  top: 0;
  left: 0;
  .center {
    flex: 1;
    padding: 0 50px;
    text-align: center;
    .search {
      width: 520px;
      height: 60px;
      border-radius: 60px;
      background-color: #fff;
      margin: auto;
      display: flex;
      align-items: center;
      padding: 0 20px;
      .text {
        margin-left: 20px;
        color: rgb(161, 161, 161);
      }
      .icon {
        color: rgb(116, 116, 116);
      }
    }
  }
}
</style>
