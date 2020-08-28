import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  RouteTable,
  VPCId,
  SubnetId,
  InternetGatewayId
} from "@libs/domain/models/aws";

import { uiActions } from "@modules/ui";
import { awsActions, awsSelector } from "@modules/aws";
import { SelectField } from "@components/molecules";
import { Button } from "@components/atoms";

interface IFormValues {
  vpcId: string;
  subnetId: string;
  gatewayId: string;
}

const validation = Yup.object().shape<IFormValues>({
  vpcId: Yup.string().required("※VPCIdを入力してください"),
  subnetId: Yup.string().required("※SubnetIdを選択してください"),
  gatewayId: Yup.string().required("※GatewayIdを選択してください")
});

interface IProps {
  routeTable?: RouteTable;
}

export const RouteTableForm: React.SFC<IProps> = ({ routeTable }) => {
  const dispatch = useDispatch();
  const awsState = useSelector(awsSelector.selectAll);
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      vpcId:
        routeTable?.properties.vpcId.value ??
        awsState.vpcList[0]?.resource.id.value ??
        "",
      subnetId:
        routeTable?.properties.subnetId.value ??
        awsState.subnetList[0]?.resource.id.value ??
        "",
      gatewayId:
        routeTable?.properties.gatewayId?.value ??
        awsState.internetGatewayList[0]?.resource.id.value ??
        ""
    },
    onSubmit: values => {
      const vpcId = new VPCId(values.vpcId);
      const subnetId = new SubnetId(values.subnetId);
      const gatewayId = values.gatewayId
        ? new InternetGatewayId(values.gatewayId)
        : undefined;
      if (routeTable) {
        routeTable.update({
          vpcId: vpcId,
          subnetId: subnetId,
          gatewayId: gatewayId
        });
        dispatch(
          awsActions.routeTable.update({
            routeTableId: routeTable.id,
            routeTableView: {
              resource: routeTable
            }
          })
        );
      } else {
        dispatch(
          awsActions.routeTable.create({
            resource: new RouteTable({
              properties: {
                vpcId: vpcId,
                subnetId: subnetId,
                gatewayId: gatewayId
              }
            })
          })
        );
      }
      dispatch(uiActions.removeModal());
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
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
      <SelectField
        label="SubnetId"
        name="subnetId"
        value={formik.values.subnetId}
        onChange={formik.handleChange}
        options={awsState.subnetList.map(s => ({
          label: s.resource.properties.name,
          value: s.resource.id.value
        }))}
        error={formik.errors.subnetId}
        touched={formik.touched.subnetId}
      />
      <SelectField
        label="GatewayId"
        name="gatewayId"
        value={formik.values.gatewayId}
        onChange={formik.handleChange}
        options={awsState.internetGatewayList.map(i => ({
          label: i.resource.id.value,
          value: i.resource.id.value
        }))}
        error={formik.errors.gatewayId}
        touched={formik.touched.gatewayId}
      />
      <Button
        type="submit"
        value={routeTable ? "更新" : "作成"}
        onClick={() => {}}
      />
      {routeTable ? (
        <Button
          value="削除"
          onClick={() => {
            dispatch(awsActions.routeTable.remove(routeTable.id));
            dispatch(uiActions.removeModal());
          }}
        />
      ) : null}
    </form>
  );
};
