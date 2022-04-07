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
  Button,
  Search,
  Tab,
  Tabs,
  Empty,
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
  Button,
  Search,
  Tab,
  Tabs,
  Empty,
];

export default function (app: App) {
  for (const item of components) {
    app.use(item);
  }
}
