import * as React from "react";
import { useState } from "react";
import useInterval from "use-interval";
import { DI } from "@libs/application/DI";
import { ILog } from "@libs/application/datastore/LogDatastore";
import { Text } from "@components/atoms";

export const LogDisplay: React.SFC = () => {
  const [logs, setLogs] = useState<ILog[]>([]);

  useInterval(() => {
    const newLogs = DI.logger.getLog();
    if (newLogs.length > logs.length) {
      setLogs([...newLogs]);
    }
  }, 100);

  return (
    <div>
      {logs.map((log, i) => (
        <Text key={i} content={log.value} error={log.type === "error"} />
      ))}
    </div>
  );
};
