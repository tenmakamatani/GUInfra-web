import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { EC2, SubnetId, SecurityGroupId } from "@libs/domain/models/aws";

import { uiActions } from "@modules/ui";
import { awsActions, awsSelector } from "@modules/aws";

import { Button } from "@components/atoms";
import { SelectField, InputField } from "@components/molecules";

interface IProps {
  ec2?: EC2;
}

interface IFormValues {
  name: string;
  subnetId: string;
  securityGroupId: string;
}

const validation = Yup.object().shape({
  name: Yup.string().required("※Nameを入力してください"),
  subnetId: Yup.string().required("※SubnetIdを入力してください"),
  securityGroupId: Yup.string()
});

export const EC2Form: React.SFC<IProps> = props => {
  const ec2 = props.ec2;
  const dispatch = useDispatch();
  const awsState = useSelector(awsSelector.selectAll);
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      name: "",
      subnetId: awsState.subnetList[0]?.resource.id.value ?? "",
      securityGroupId: awsState.securityGroupList[0]?.resource.id.value ?? ""
    },
    onSubmit: values => {
      const name = values.name;
      const subnetId = new SubnetId(values.subnetId);
      const securityGroupIds = [new SecurityGroupId(values.securityGroupId)];
      if (ec2) {
        ec2.update({
          name: name,
          subnetId: subnetId,
          securityGroupIds: securityGroupIds
        });
        dispatch(
          awsActions.ec2.update({
            ec2Id: ec2.id,
            ec2View: {
              resource: ec2
            }
          })
        );
      } else {
        dispatch(
          awsActions.ec2.create({
            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.5,
            width: 100,
            height: 100,
            resource: new EC2({
              properties: {
                name: name,
                subnetId: subnetId,
                securityGroupIds: securityGroupIds
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
      <InputField
        label="Name"
        name="name"
        type="text"
        placeholder="ec2-1"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <SelectField
        label="SubnetId"
        name="subnetId"
        value={formik.values.subnetId}
        onChange={formik.handleChange}
        options={awsState.subnetList.map(s => ({
          label: s.resource.id.value,
          value: s.resource.id.value
        }))}
        error={formik.errors.subnetId}
      />
      <SelectField
        label="SecurityGroupIds"
        name="securityGroupId"
        value={formik.values.securityGroupId}
        onChange={formik.handleChange}
        options={awsState.securityGroupList.map(s => ({
          label: s.resource.properties.name,
          value: s.resource.id.value
        }))}
        error={formik.errors.securityGroupId}
      />
      <Button type="submit" value={ec2 ? "更新" : "作成"} onClick={() => {}} />
      {ec2 ? (
        <Button
          value="削除"
          onClick={() => {
            dispatch(awsActions.ec2.remove(ec2.id));
            dispatch(uiActions.removeModal());
          }}
        />
      ) : null}
    </form>
  );
};
