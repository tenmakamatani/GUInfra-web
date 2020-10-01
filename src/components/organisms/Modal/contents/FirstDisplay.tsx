import * as React from "react";
import { css } from "@emotion/core";
import { Text, Margin } from "@components/atoms";
import config from "@config";

const styles = {
  imgWrapper: css({
    width: "100%",
    textAlign: "center"
  }),
  img: css({
    width: "50%",
    height: "auto"
  })
};

export const FirstDisplay: React.SFC = () => {
  return (
    <div>
      <Margin height={10} />
      <Text size="big" bold content="はじめに" />
      <Margin height={20} />
      <Text
        size="normal"
        content="当サービスでは、トークンやシークレットキーを入力することでクラウドインフラのリソースを作成することが可能ですが、それらを保存することは一切ございません。"
      />
      <Text
        size="normal"
        content="また当サービスはスマホからではなくPCから使用することを推奨します。"
      />
      <Margin height={20} />
      <div css={styles.imgWrapper}>
        <img css={styles.img} src={config.images.firstDisplay} />
      </div>
    </div>
  );
};
