import { injectable } from "inversify";

import { firebase } from "./firebase";

@injectable()
export class Analytics {
  logOnOpenCreateModal(): void {
    if (process.env.FB_ENV !== "production") {
      return;
    }
    firebase.analytics().logEvent("on_open_create_modal");
  }
  logOnCreateResource(): void {
    if (process.env.FB_ENV !== "production") {
      return;
    }
    firebase.analytics().logEvent("on_create_resource");
  }
  logOnDeleteResource(): void {
    if (process.env.FB_ENV !== "production") {
      return;
    }
    firebase.analytics().logEvent("on_delete_resource");
  }
}
