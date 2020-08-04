import * as React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { SecurityGroup } from "@libs/domain/models/aws";

import { uiActions } from "@modules/ui";
import { awsActions } from "@modules/aws";

import { InputField } from "@components/molecules";

interface IProps {
  securityGroup?: SecurityGroup;
}

interface IFormValues {
  name: string;
  description: string;
}

const validation = Yup.object().shape<IFormValues>({
  name: Yup.string().required("※nameを入力してください"),
  description: Yup.string().required("※descriptionを入力してください")
});

export const SecurityGroupForm: React.SFC<IProps> = ({ securityGroup }) => {
  const dispatch = useDispatch();
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      name: securityGroup?.properties.name ?? "",
      description: securityGroup?.properties.description ?? ""
    },
    onSubmit: values => {
      if (securityGroup) {
        securityGroup.update({
          properties: {
            name: values.name,
            description: values.description,
            permissions: {
              ingress: [],
              egress: []
            }
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
                name: values.name,
                description: values.description,
                permissions: {
                  ingress: [],
                  egress: []
                }
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
        label="Name"
        name="name"
        type="text"
        placeholder="SecurityGroup1"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <InputField
        label="Description"
        name="description"
        type="text"
        placeholder="説明"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description}
      />
      <button type="submit">{securityGroup ? "更新" : "作成"}</button>
      {securityGroup ? (
        <button
          onClick={() => {
            dispatch(awsActions.securityGroup.remove(securityGroup.id));
            dispatch(uiActions.removeModal());
          }}
        >
          削除
        </button>
      ) : null}
    </form>
  );
};
