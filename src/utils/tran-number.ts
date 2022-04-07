export function tranNumber(num: number) {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(2) + "亿";
  } else if (num >= 10000) {
    return (num / 10000).toFixed(0) + "万";
  }
}
