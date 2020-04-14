"use strict";

import * as Express from "express";
import * as path from "path";

const app = Express();
app.use(Express.static(path.join(__dirname, "..", "..", "dist")));

app.get("/*", (req: Express.Request, res: Express.Response) => {
  res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"));
});

app.listen(8000, () => {
  console.log("server listening at port 8000");
});
