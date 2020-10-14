import * as React from "react";
import Head from "next/head";
import { TopPage } from "@components/pages";
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
        <meta name="og:title" content="トップページ | GUInfra" />
        <meta name="og:image" content={config.images.ogImage} />
        <meta
          name="og:url"
          content={config.baseUrl}
        />
        <meta
          name="og:description"
          content="GUInfraは、クラウドインフラの学習を支援するサービスです。構成図から直接リソースを建てることができます。"
        />
        <meta
          name="twitter:title"
          content="トップページ | GUInfra"
        />
        <meta
          name="twitter:image"
          content={config.images.ogImage}
        />
        <meta
          name="twitter:url"
          content={config.baseUrl}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <TopPage />
    </React.Fragment>
  );
};
