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
      <Margin height={10} />
      <Text
        size="normal"
        content="GUInfraは、選択できるプロパティを制限してクラウドインフラの構成図を作成し、実際にリソースを建てて確認することでクラウドインフラを効率よく学習できるサービスです。現在はAWSに対応しています。"
      />
      <Margin height={5} />
      <Text
        size="normal"
        content="当サービスでは、トークンやシークレットキーを入力することでクラウドインフラのリソースを作成することが可能ですが、それらを保存することは一切ございません。"
      />
      <Margin height={5} />
      <Text
        size="normal"
        content="またスマホからではなくPCから使用することを推奨します。"
      />
      <Margin height={10} />
      <div css={styles.imgWrapper}>
        <img css={styles.img} src={config.images.firstDisplay} />
      </div>
    </div>
  );
};
