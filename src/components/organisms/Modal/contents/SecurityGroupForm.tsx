import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  SecurityGroup,
  IpPermissionType,
  VPCId
} from "@libs/domain/models/aws";

import { uiActions } from "@modules/ui";
import { awsActions, awsSelector } from "@modules/aws";

import { InputField, SelectField } from "@components/molecules";
import { Button } from "@components/atoms";

interface IProps {
  securityGroup?: SecurityGroup;
}

interface IFormValues {
  vpcId: string;
  name: string;
  description: string;
  ingressPermissionTypes: string[];
  egressPermissionTypes: string[];
}

const validation = Yup.object().shape<IFormValues>({
  vpcId: Yup.string().required("※VPCIdを入力してください"),
  name: Yup.string().required("※Nameを入力してください"),
  description: Yup.string().required("※Descriptionを入力してください"),
  ingressPermissionTypes: Yup.array<string>() as Yup.MixedSchema<string[]>,
  egressPermissionTypes: Yup.array<string>() as Yup.MixedSchema<string[]>
});

export const SecurityGroupForm: React.SFC<IProps> = ({ securityGroup }) => {
  const dispatch = useDispatch();
  const awsState = useSelector(awsSelector.selectAll);
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      vpcId:
        securityGroup?.properties.vpcId.value ??
        awsState.vpcList[0]?.resource.id.value ??
        "",
      name: securityGroup?.properties.name ?? "",
      description: securityGroup?.properties.description ?? "",
      ingressPermissionTypes:
        securityGroup?.properties.permissions.ingress.map(i => i.type) ?? [],
      egressPermissionTypes:
        securityGroup?.properties.permissions.egress.map(e => e.type) ?? []
    },
    onSubmit: values => {
      const { name, description } = values;
      const vpcId = new VPCId(values.vpcId);
      const ingressPermissions = values.ingressPermissionTypes.map(i => ({
        type: i as IpPermissionType
      }));
      const egressPermissions = values.egressPermissionTypes.map(e => ({
        type: e as IpPermissionType
      }));
      if (securityGroup) {
        securityGroup.update({
          vpcId: vpcId,
          name: name,
          description: description,
          permissions: {
            ingress: ingressPermissions,
            egress: egressPermissions
          }
        });
        dispatch(
          awsActions.securityGroup.update({
            securityGroupId: securityGroup.id,
            securityGroupView: {
              resource: securityGroup
            }
          })
        );
      } else {
        dispatch(
          awsActions.securityGroup.create({
            resource: new SecurityGroup({
              properties: {
                vpcId: vpcId,
                name: name,
                description: description,
                permissions: {
                  ingress: ingressPermissions,
                  egress: egressPermissions
                }
              }
            })
          })
        );
      }
      dispatch(uiActions.removeModal());
    }
  });

  const pushOrRemove = (value: string, oldValues: string[]): string[] => {
    let newValues: string[];
    if (oldValues.includes(value)) {
      newValues = oldValues.filter(o => o !== value);
    } else {
      oldValues.push(value);
      newValues = [...oldValues];
    }
    return newValues;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <SelectField
        label="VPCId"
        name="vpcId"
        value={formik.values.vpcId}
        options={awsState.vpcList.map(v => ({
          label: v.resource.properties.name,
          value: v.resource.id.value
        }))}
        onChange={formik.handleChange}
        error={formik.errors.vpcId}
        touched={formik.touched.vpcId}
      />
      <InputField
        label="Name"
        name="name"
        type="text"
        placeholder="SecurityGroup1"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
        touched={formik.touched.name}
      />
      <InputField
        label="Description"
        name="description"
        type="text"
        placeholder="説明"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description}
        touched={formik.touched.description}
      />
      <SelectField
        label="Permissions(ingress)"
        name="ingressPermissionTypes"
        value={formik.values.ingressPermissionTypes}
        onChange={e => {
          formik.setFieldValue(
            "ingressPermissionTypes",
            pushOrRemove(e.target.value, formik.values.ingressPermissionTypes)
          );
        }}
        options={[
          { label: "ssh", value: "ssh" },
          { label: "http", value: "http" },
          { label: "https", value: "https" },
          { label: "all", value: "all" }
        ]}
      />
      <SelectField
        label="Permissions(egress)"
        name="egressPermissionTypes"
        value={formik.values.egressPermissionTypes}
        onChange={e => {
          formik.setFieldValue(
            "egressPermissionTypes",
            pushOrRemove(e.target.value, formik.values.egressPermissionTypes)
          );
        }}
        options={[
          { label: "ssh", value: "ssh" },
          { label: "http", value: "http" },
          { label: "https", value: "https" },
          { label: "all", value: "all" }
        ]}
        multiple
      />
      <Button
        type="submit"
        value={securityGroup ? "更新" : "作成"}
        onClick={() => {}}
      />
      {securityGroup ? (
        <Button
          value="削除"
          onClick={() => {
            dispatch(awsActions.securityGroup.remove(securityGroup.id));
            dispatch(uiActions.removeModal());
          }}
        />
      ) : null}
    </form>
  );
};
