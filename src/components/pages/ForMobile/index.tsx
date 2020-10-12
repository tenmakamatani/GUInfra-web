import * as React from "react";
import { Text, Margin } from "@components/atoms";
import config from "@config";
import styles from "./styles";

export const ForMobilePage: React.SFC = () => {
  return (
    <div>
      <div css={styles.wrapper}>
        <Margin height={200} />
        <img
          css={styles.img}
          src={config.images.firstDisplay}
          alt=""
        />
        <Margin height={10} />
        <Text
          content="Sorry!"
          size="big"
        />
        <Margin height={10} />
        <Text
          content="GUInfraは、グラフ作成等の機能があるため、PCからのアクセスを推奨しています!!"
          size="normal"
        />
      </div>
    </div>
  );
}
