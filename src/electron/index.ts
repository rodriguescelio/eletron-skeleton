import "log-timestamp";

import { app } from "electron";
import mainService from "./services/main.service";

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on("ready", () => mainService.init());
