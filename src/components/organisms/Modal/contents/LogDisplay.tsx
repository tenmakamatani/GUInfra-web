import * as React from "react";
import { ILog, LogDatastore } from "@libs/application/datastore/LogDatastore";
import { Text } from "@components/atoms";

export const LogDisplay: React.SFC = () => {
  const [logs, setLogs] = React.useState<ILog[]>([]);

  React.useEffect(() => {
    setLogs(LogDatastore.getLog());
  }, [LogDatastore.getLog()]);

  return (
    <div>
      {logs.map((log, i) => (
        <Text key={i} content={log.value} error={log.type === "error"} />
      ))}
    </div>
  );
};
