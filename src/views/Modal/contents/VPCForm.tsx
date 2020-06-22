import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { VPC } from "@libs/domain/models/aws";

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
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      cidrBlock: vpc?.properties.cidrBlock ?? "",
      tags: vpc?.tags.map(tag => `${tag.key}:${tag.value}`).join() ?? ""
    },
    onSubmit: values => {
      console.log(values);
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
      <button type="submit">作成</button>
    </form>
  );
};
