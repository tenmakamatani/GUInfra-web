import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { EC2 } from "@libs/domain/models/aws";

import { uiActions } from "@modules/ui";
import { awsActions, awsSelector } from "@modules/aws";

import { Button } from "@components/atoms";
import { SelectField } from "@components/molecules";

const validation = Yup.object().shape({
  securityGroupId: Yup.string()
});

interface IProps {
  ec2?: EC2;
}

interface IFormValues {
  securityGroupId: string;
}

export const EC2Form: React.SFC<IProps> = props => {
  const ec2 = props.ec2;
  const dispatch = useDispatch();
  const awsState = useSelector(awsSelector.selectAll);
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      securityGroupId: awsState.securityGroupList[0]?.resource.id.value ?? ""
    },
    onSubmit: values => {
      const securityGroupIds = awsState.securityGroupList
        .filter(s => s.resource.id.value === values.securityGroupId)
        .map(v => v.resource.id);
      if (ec2) {
        ec2.update({
          imageId: ec2.properties.imageId,
          instanceType: ec2.properties.instanceType,
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
              // Todo: Configへ追加
              properties: {
                imageId: "ami-0ee1410f0644c1cac",
                instanceType: "t2.micro",
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
