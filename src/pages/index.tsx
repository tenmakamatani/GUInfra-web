import * as React from "react";
import Head from "next/head";
import { IndexPage } from "@components/pages/Index";
import config from "@config";

export default () => {
  return (
    <React.Fragment>
      <Head>
        <title>GUInfra | トップページ</title>
        <meta
          name="description"
          content="GUInfraは、クラウドインフラの学習を支援するサービスです。構成図から直接リソースを建てることができます。"
        />
        <meta name="keywords" content="GUInfra,AWS,クラウドインフラ" />
        <meta name="og:title" content="GUInfra | トップページ" />
        <meta name="og:image" content={config.images.logo} />
        <meta
          name="og:url"
          content="https://guinfra-web.tenmakamatani.vercel.app"
        />
        <meta
          name="og:description"
          content="GUInfraは、クラウドインフラの学習を支援するサービスです。構成図から直接リソースを建てることができます。"
        />
      </Head>
      <IndexPage />
    </React.Fragment>
  );
};
