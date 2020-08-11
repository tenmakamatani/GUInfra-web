import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Subnet, VPCId } from "@libs/domain/models/aws";

import { uiActions } from "@modules/ui";
import { awsActions, awsSelector } from "@modules/aws";
import { InputField, SelectField } from "@components/molecules";
import { Button } from "@components/atoms";

const validation = Yup.object().shape({
  cidrBlock: Yup.string().required("※CIDRブロックを入力してください"),
  availabilityZone: Yup.string().required(
    "※AvailabilityZoneを入力してください"
  ),
  vpcId: Yup.string().required("※VPCを選択してください")
});

interface IProps {
  subnet?: Subnet;
}

interface IFormValues {
  cidrBlock: string;
  availabilityZone: string;
  vpcId: string;
}

export const SubnetForm: React.SFC<IProps> = props => {
  const subnet = props.subnet;
  const dispatch = useDispatch();
  const awsState = useSelector(awsSelector.selectAll);
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      cidrBlock: "",
      availabilityZone: "",
      vpcId: awsState.vpcList[0]?.resource.id.value ?? ""
    },
    onSubmit: values => {
      if (subnet) {
        subnet.update({
          properties: {
            cidrBlock: values.cidrBlock,
            availabilityZone: values.availabilityZone,
            vpcId: new VPCId(values.vpcId)
          }
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
          awsActions.subnet.create({
            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.5,
            width: 100,
            height: 100,
            resource: new Subnet({
              properties: {
                cidrBlock: values.cidrBlock,
                availabilityZone: values.availabilityZone,
                vpcId: new VPCId(values.vpcId)
              },
              tags: []
            })
          })
        );
      }
      dispatch(uiActions.removeModal());
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputField
        label="CIDRブロック"
        name="cidrBlock"
        type="text"
        placeholder="10.0.0.0/16"
        value={formik.values.cidrBlock}
        onChange={formik.handleChange}
        error={formik.errors.cidrBlock}
      />
      <InputField
        label="アベイラビリティーゾーン"
        name="availabilityZone"
        type="text"
        placeholder="ap-northeast-1a"
        value={formik.values.availabilityZone}
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
