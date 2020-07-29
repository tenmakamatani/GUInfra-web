import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { DI } from "@libs/application/DI";
import { uiActions } from "@modules/ui";
import { awsSelector } from "@modules/aws";

const validation = Yup.object().shape({
  accessKeyId: Yup.string().required("※アクセスキーを入力してください"),
  secretAccessKey: Yup.string().required("※シークレットキーを入力してください")
});

interface IFormValues {
  accessKeyId: string;
  secretAccessKey: string;
}

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
      DI.setup({
        accessKeyId: values.accessKeyId,
        secretAccessKey: values.secretAccessKey,
        region: "ap-northeast-1"
      });
      await DI.awsResourceUseCase.create({
        ec2List: awsState.ec2List.map(ec2View => ec2View.resource),
        vpcList: awsState.vpcList.map(vpcView => vpcView.resource),
        securityGroupList: awsState.securityGroupList.map(
          securityGroupView => securityGroupView.resource
        )
      });
      dispatch(uiActions.removeModal());
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="accessKeyId"
        type="text"
        placeholder="アクセスキー"
        value={formik.values.accessKeyId}
        onChange={formik.handleChange}
      />
      <p>{formik.errors.accessKeyId}</p>
      <input
        name="secretAccessKey"
        type="text"
        placeholder="シークレットキー"
        value={formik.values.secretAccessKey}
        onChange={formik.handleChange}
      />
      <p>{formik.errors.secretAccessKey}</p>
      <button type="submit">作成</button>
    </form>
  );
};
