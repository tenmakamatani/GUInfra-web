import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { DI } from "@libs/application/DI";
import { toast } from "@libs/application/utils";
import { uiActions, ModalTypes } from "@modules/ui";
import { awsSelector } from "@modules/aws";
import { InputField } from "@components/molecules";
import { Margin, Button, Text } from "@components/atoms";

interface IFormValues {
  accessKeyId: string;
  secretAccessKey: string;
}

const validation = Yup.object().shape<IFormValues>({
  accessKeyId: Yup.string().required("※アクセスキーを入力してください"),
  secretAccessKey: Yup.string().required("※シークレットキーを入力してください")
});

export const MetadataForm: React.SFC = () => {
  const dispatch = useDispatch();
  const awsState = useSelector(awsSelector.selectAll);
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      accessKeyId: "",
      secretAccessKey: ""
    },
    onSubmit: async values => {
      DI.analytics.logOnCreateResource();
      DI.setup({
        accessKeyId: values.accessKeyId,
        secretAccessKey: values.secretAccessKey,
        region: "ap-northeast-1"
      });
      dispatch(
        uiActions.appearModal({
          type: ModalTypes.LogDisplay
        })
      );
      await DI.awsResourceUseCase
        .create({
          ec2List: awsState.ec2List.map(ec2View => ec2View.resource),
          vpcList: awsState.vpcList.map(vpcView => vpcView.resource),
          subnetList: awsState.subnetList.map(
            subnetView => subnetView.resource
          ),
          routeTableList: awsState.routeTableList.map(
            routeTableView => routeTableView.resource
          ),
          securityGroupList: awsState.securityGroupList.map(
            securityGroupView => securityGroupView.resource
          ),
          internetGatewayList: awsState.internetGatewayList.map(
            internetGatewayView => internetGatewayView.resource
          )
        })
        .catch(async e => {
          toast.error(
            "リソースの作成に失敗しました。リソースを削除しています…"
          );
          toast.error(e);
          await DI.awsResourceUseCase.deleteAll();
        })
        .finally(() => {
          dispatch(uiActions.removeModal());
          toast.success("リソースの作成に成功しました");
        });
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <InputField
        label="AccessKeyId"
        name="accessKeyId"
        type="text"
        placeholder="Your AWS AccessKeyId"
        value={formik.values.accessKeyId}
        onChange={formik.handleChange}
        error={formik.errors.accessKeyId}
        touched={formik.touched.accessKeyId}
      />
      <InputField
        label="SecretAccessKey"
        name="secretAccessKey"
        type="text"
        placeholder="Your AWS SecretAccessKey"
        value={formik.values.secretAccessKey}
        onChange={formik.handleChange}
        error={formik.errors.secretAccessKey}
        touched={formik.touched.secretAccessKey}
      />
      <Button inverted type="submit" value="作成" onClick={() => {}} />
      <Margin height={10} />
      <Text bold size="normal" content="2つのキーの取得の仕方" />
      <Margin height={10} />
      <Text
        size="small"
        content="AWSコンソールにアクセスし、「サービス」から「IAM」を検索します。左側のメニューから「アクセス管理」→「ユーザー」を選択し、「ユーザーを追加」を押します。ユーザ名を任意の名前にし、「プログラムによるアクセス」を選択して次に進みます。次に「既存のポリシーをアタッチ」から、「AmazonEC2FullAccess」、「AmazonVPCFullAccess」を選択し、次ページで任意のタグをつけてユーザを作成します。ここでアクセスキー、シークレットキーが表示されるので、それらを入力してください。またセキュリティ的に不安な方は、サービスの使用を終えた際に、作成したIAMユーザを削除してください。"
      />
    </form>
  );
};
