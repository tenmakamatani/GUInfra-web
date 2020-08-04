import * as React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { EC2 } from "@libs/domain/models/aws";

import { uiActions } from "@modules/ui";
import { awsActions } from "@modules/aws";

import { Button } from "@components/atoms";
import { InputField } from "@components/molecules";

const validation = Yup.object().shape({
  tags: Yup.string()
});

interface IProps {
  ec2?: EC2;
}

interface IFormValues {
  tags: string;
}

export const EC2Form: React.SFC<IProps> = props => {
  const ec2 = props.ec2;
  const dispatch = useDispatch();
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      tags: ec2?.tags.map(tag => `${tag.key}:${tag.value}`).join() ?? ""
    },
    onSubmit: values => {
      const tags = values.tags.split("¥n").map(val => ({
        key: val.split(":")[0],
        value: val.split(":")[1]
      }));
      if (ec2) {
        ec2.update({
          tags: tags
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
                imageId: "ami-0ee1410f0644c1cac",
                instanceType: "t2.micro"
              },
              tags: tags
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
        label="Tags"
        name="tags"
        type="text"
        placeholder="key:value"
        value={formik.values.tags}
        onChange={formik.handleChange}
        error={formik.errors.tags}
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
