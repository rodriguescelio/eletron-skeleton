import mainService from "../services/main.service";
import windowService from "../services/window.service";

class MainController {
  resizeWindow(width: number, height: number) {
    windowService.resizeMainWindow(width, height);
  }

  minimize() {
    windowService.minimizeMainWindow();
  }

  close() {
    mainService.close();
  }
}

export default new MainController();
