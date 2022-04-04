import { App } from "vue";
import {
  Swipe,
  SwipeItem,
  NavBar,
  ConfigProvider,
  Icon,
  Loading,
  Slider,
  Sticky,
} from "vant";
const components = [
  Swipe,
  SwipeItem,
  NavBar,
  ConfigProvider,
  Icon,
  Loading,
  Slider,
  Sticky,
];

export default function (app: App) {
  for (const item of components) {
    app.use(item);
  }
}
