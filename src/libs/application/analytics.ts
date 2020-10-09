import { injectable } from "inversify";
import config from "@config";
import { firebase } from "./firebase";

@injectable()
export class Analytics {
  logOnCreateResource(): void {
    if (!config.isProd) {
      return;
    }
    firebase.analytics().logEvent("on_create_resource");
  }
  logOnDeleteResource(): void {
    if (!config.isProd) {
      return;
    }
    firebase.analytics().logEvent("on_delete_resource");
  }
}
