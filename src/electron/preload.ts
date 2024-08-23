import { contextBridge, ipcRenderer } from "electron";
import { ActionController } from "../model/dto/actionController";

interface ControllerFunctions {
  [func: string]: (...args: any[]) => Promise<any>;
}

const api: {
  [controller: string]: ControllerFunctions;
} = {};

ipcRenderer
  .sendSync("getControllerActions")
  .forEach((controller: ActionController) => {
    api[controller.key] = controller.methods.reduce(
      (object: ControllerFunctions, it: string) => {
        object[it] = (...args: any[]) =>
          ipcRenderer.invoke(`${controller.key}:${it}`, ...args);
        return object;
      },
      {},
    );
  });

contextBridge.exposeInMainWorld("app", {
  ...api,
  isPackaged: () => ipcRenderer.sendSync("isPackaged"),
  on: (channel: string, listener: (...args: any[]) => void) =>
    ipcRenderer.on(channel, (_, ...args: any[]) => listener(...args)),
});
