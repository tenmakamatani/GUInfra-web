import * as React from "react";
import { LogDatastore } from "@libs/application/datastore/LogDatastore";
import { Text } from "@components/atoms";

export const LogDisplay: React.SFC = () => {
  return (
    <div>
      {LogDatastore.getLog().map(log => (
        <Text content={log.value} error={log.type === "error"} />
      ))}
    </div>
  );
};
