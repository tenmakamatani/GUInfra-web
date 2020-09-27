import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { InternetGateway, VPCId } from "@libs/domain/models/aws";

import { uiActions } from "@modules/ui";
import { awsActions, awsSelector } from "@modules/aws";

import { Button } from "@components/atoms";
import { SelectField, InputField } from "@components/molecules";

interface IProps {
  internetGateway?: InternetGateway;
}

interface IFormValues {
  name: string;
  vpcId: string;
}
const validation = Yup.object().shape<IFormValues>({
  name: Yup.string().required("※Nameを入力してください"),
  vpcId: Yup.string().required("※VPCIdを入力してください")
});

export const InternetGatewayForm: React.SFC<IProps> = ({ internetGateway }) => {
  const dispatch = useDispatch();
  const awsState = useSelector(awsSelector.selectAll);
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      name: internetGateway?.properties.name ?? "",
      vpcId:
        internetGateway?.properties.vpcId.value ??
        awsState.vpcList[0]?.resource.id.value ??
        ""
    },
    onSubmit: values => {
      const { name } = values;
      const vpcId = new VPCId(values.vpcId);
      if (internetGateway) {
        internetGateway.update({
          name: name,
          vpcId: vpcId
        });
        dispatch(
          awsActions.internetGateway.update({
            internetGatewayId: internetGateway.id,
            internetGatewayView: {
              resource: internetGateway
            }
          })
        );
      } else {
        dispatch(
          awsActions.internetGateway.create(
            new InternetGateway({
              properties: {
                name: name,
                vpcId: vpcId
              }
            })
          )
        );
      }
      dispatch(uiActions.removeModal());
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <InputField
        label="Name"
        name="name"
        type="text"
        placeholder="internet-gateway-1"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
        touched={formik.touched.name}
      />
      <SelectField
        label="VPCId"
        name="vpcId"
        value={formik.values.vpcId}
        onChange={formik.handleChange}
        options={awsState.vpcList.map(v => ({
          label: v.resource.properties.name,
          value: v.resource.id.value
        }))}
        error={formik.errors.vpcId}
        touched={formik.touched.vpcId}
      />
      <Button
        type="submit"
        inverted
        value={internetGateway ? "更新" : "作成"}
        onClick={() => {}}
      />
      {internetGateway ? (
        <Button
          value="削除"
          onClick={() => {
            dispatch(awsActions.internetGateway.remove(internetGateway.id));
            dispatch(uiActions.removeModal());
          }}
        />
      ) : null}
    </form>
  );
};
