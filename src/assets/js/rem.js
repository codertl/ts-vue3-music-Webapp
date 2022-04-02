// function remSize() {
//   // 获取设备宽度
//   let device = window.innerWidth || document.documentElement.clientWidth;
//   // 设备大于750，那就等于750
//   if (device >= 750) device = 750;
//   // 设备小于320，那就等于320
//   if (device <= 320) device = 320;
//   document.documentElement.style.fontSize = device / 7.5 + "px";
//   document.body.style.fontSize = 0.3 + "rem";
//   console.log(device);
// }

// remSize();

// window.addEventListener("resize", () => {
//   remSize();
// });

(function () {
  function autoRootFontSize() {
    document.documentElement.style.fontSize =
      (Math.min(
        screen.width,
        document.documentElement.getBoundingClientRect().width
      ) /
        750) *
        32 +
      "px";

    // 取screen.width和document.documentElement.getBoundingClientRect().width的最小值；除以750，乘以32；懂的起撒，就是原本是750大小的32px;如果屏幕大小变成了375px,那么字体就是16px;也就是根字体fontSize大小和屏幕大小成正比变化！是不是很简单
  }

  window.addEventListener("resize", autoRootFontSize);

  autoRootFontSize();
})();
