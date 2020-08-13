import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AvailabilityZone } from "@libs/domain/models/aws/AvailabilityZone";
import { Subnet, VPCId } from "@libs/domain/models/aws";

import { uiActions } from "@modules/ui";
import { awsActions, awsSelector } from "@modules/aws";
import { InputField, SelectField } from "@components/molecules";
import { Button } from "@components/atoms";

interface IProps {
  subnet?: Subnet;
}

interface IFormValues {
  name: string;
  cidrBlock: string;
  availabilityZone: string;
  vpcId: string;
}

const validation = Yup.object().shape<IFormValues>({
  name: Yup.string().required("※Nameを入力してください"),
  cidrBlock: Yup.string().required("※CIDRブロックを入力してください"),
  availabilityZone: Yup.string().required(
    "※AvailabilityZoneを入力してください"
  ),
  vpcId: Yup.string().required("※VPCを選択してください")
});

export const SubnetForm: React.SFC<IProps> = props => {
  const subnet = props.subnet;
  const dispatch = useDispatch();
  const awsState = useSelector(awsSelector.selectAll);
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      name: subnet?.properties.name ?? "",
      cidrBlock: subnet?.properties.cidrBlock ?? "",
      availabilityZone: subnet?.properties.availabilityZone ?? "",
      vpcId:
        subnet?.properties.vpcId.value ??
        awsState.vpcList[0]?.resource.id.value ??
        ""
    },
    onSubmit: values => {
      const { name, cidrBlock, availabilityZone } = values;
      const vpcId = new VPCId(values.vpcId);
      if (subnet) {
        subnet.update({
          name: name,
          cidrBlock: cidrBlock,
          availabilityZone: availabilityZone,
          vpcId: vpcId
        });
        dispatch(
          awsActions.subnet.update({
            subnetId: subnet.id,
            subnetView: {
              resource: subnet
            }
          })
        );
      } else {
        dispatch(
          awsActions.subnet.create(
            new Subnet({
              properties: {
                name: name,
                cidrBlock: cidrBlock,
                availabilityZone: availabilityZone,
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
        placeholder="subnet-1"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <InputField
        label="CIDRブロック"
        name="cidrBlock"
        type="text"
        placeholder="10.0.0.0/16"
        value={formik.values.cidrBlock}
        onChange={formik.handleChange}
        error={formik.errors.cidrBlock}
      />
      <SelectField
        label="AvailabilityZone"
        name="availabilityZone"
        value={formik.values.availabilityZone}
        options={AvailabilityZone.map(v => ({
          label: v,
          value: v
        }))}
        onChange={formik.handleChange}
        error={formik.errors.availabilityZone}
      />
      <SelectField
        label="VPCId"
        name="vpcId"
        value={formik.values.vpcId}
        onChange={formik.handleChange}
        options={awsState.vpcList.map(vpc => ({
          label: vpc.resource.properties.cidrBlock,
          value: vpc.resource.id.value
        }))}
        error={formik.errors.vpcId}
      />
      <Button
        type="submit"
        value={subnet ? "更新" : "作成"}
        onClick={() => {}}
      />
      {subnet ? (
        <Button
          value="削除"
          onClick={() => {
            dispatch(awsActions.subnet.remove(subnet.id));
            dispatch(uiActions.removeModal());
          }}
        />
      ) : null}
    </form>
  );
};
