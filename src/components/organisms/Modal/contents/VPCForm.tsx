import * as React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import config from "@config";
import { VPC } from "@libs/domain/models/aws";
import { uiActions } from "@modules/ui";
import { awsActions } from "@modules/aws";
import { InputField } from "@components/molecules";
import { Button } from "@components/atoms";
import styles from "../styles";

interface IProps {
  vpc?: VPC;
}

type IFormValues = VPC["properties"];

const validation = Yup.object().shape<IFormValues>({
  name: Yup.string().required("※Nameを入力してください"),
  cidrBlock: Yup.string()
    .required("※CIDRブロックを入力してください")
    .matches(config.regexp.cidrBlock, "※CIDRブロックの形式が違います")
});

export const VPCForm: React.SFC<IProps> = props => {
  const vpc = props.vpc;
  const dispatch = useDispatch();
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      name: vpc?.properties.name ?? "",
      cidrBlock: vpc?.properties.cidrBlock ?? ""
    },
    onSubmit: values => {
      const { name, cidrBlock } = values;
      if (vpc) {
        vpc.update({
          name: name,
          cidrBlock: cidrBlock
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
          awsActions.vpc.create(
            new VPC({
              properties: {
                name: name,
                cidrBlock: cidrBlock
              }
            })
          )
        );
      }
      dispatch(uiActions.removeModal());
    }
  });
  return (
    <form css={styles.form} onSubmit={formik.handleSubmit}>
      <InputField
        label="Name"
        name="name"
        type="text"
        placeholder="vpc-1"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
        touched={formik.touched.name}
      />
      <InputField
        label="CIDRブロック"
        name="cidrBlock"
        type="text"
        placeholder="10.0.0.0/16"
        value={formik.values.cidrBlock}
        onChange={formik.handleChange}
        error={formik.errors.cidrBlock}
        touched={formik.touched.cidrBlock}
      />
      <div>
        <Button
          type="submit"
          inverted
          value={vpc ? "更新" : "作成"}
          onClick={() => {}}
        />
        {vpc ? (
          <Button
            value="削除"
            onClick={() => {
              dispatch(awsActions.vpc.remove(vpc.id));
              dispatch(uiActions.removeModal());
            }}
          />
        ) : null}
      </div>
    </form>
  );
};
