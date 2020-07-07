import * as React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { VPC } from "@libs/domain/models/aws";

import { uiActions } from "@modules/ui";
import { awsActions } from "@modules/aws";

const validation = Yup.object().shape({
  cidrBlock: Yup.string().required("※CIDRブロックを入力してください"),
  tags: Yup.string()
});

interface IProps {
  vpc?: VPC;
}

type IFormValues = VPC["properties"] & {
  tags: string;
};

export const VPCForm: React.SFC<IProps> = props => {
  const vpc = props.vpc;
  const dispatch = useDispatch();
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      cidrBlock: vpc?.properties.cidrBlock ?? "",
      tags: vpc?.tags.map(tag => `${tag.key}:${tag.value}`).join() ?? ""
    },
    onSubmit: values => {
      const cidrBlock = values.cidrBlock;
      const tags = values.tags.split("¥n").map(val => {
        return {
          key: val.split(":")[0],
          value: val.split(":")[1]
        };
      });
      if (vpc) {
        vpc.update({
          properties: {
            cidrBlock: cidrBlock
          },
          tags: tags
        });
        dispatch(
          awsActions.vpc.update({
            vpcId: vpc.id,
            vpcView: {
              resource: vpc
            }
          })
        );
      } else {
        dispatch(
          awsActions.vpc.create({
            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.5,
            width: 100,
            height: 100,
            resource: new VPC({
              properties: {
                cidrBlock: cidrBlock
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
      <input
        name="cidrBlock"
        type="text"
        placeholder="CIDRブロック"
        value={formik.values.cidrBlock}
        onChange={formik.handleChange}
      />
      <p>{formik.errors.cidrBlock}</p>
      <input
        name="tags"
        type="text"
        placeholder="タグ"
        value={formik.values.tags}
        onChange={formik.handleChange}
      />
      <p>{formik.errors.tags}</p>
      <button type="submit">{vpc ? "更新" : "作成"}</button>
    </form>
  );
};
