import * as React from "react";
import { Rnd } from "react-rnd";

import SVG from "../public/Amazon-EC2.svg";

export const App = () => {
  return (
    <div>
      <Rnd
        lockAspectRatio={true}
        style={{
          cursor: "pointer"
        }}
      >
        <div>
          <img
            style={{ width: "100%", height: "100%", pointerEvents: "none" }}
            src={SVG}
            alt=""
          />
        </div>
      </Rnd>
    </div>
  );
};
