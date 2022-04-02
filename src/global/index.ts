import { App } from "vue";
import registerElement from "./src/register-element";
export function globalRegister(app: App) {
  app.use(registerElement);
}
