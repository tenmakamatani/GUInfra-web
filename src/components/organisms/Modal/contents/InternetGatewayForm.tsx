import * as React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { InternetGateway } from "@libs/domain/models/aws";

import { uiActions } from "@modules/ui";
import { awsActions } from "@modules/aws";

import { Button } from "@components/atoms";

interface IProps {
  internetGateway?: InternetGateway;
}

interface IFormValues {}

const validation = Yup.object().shape<IFormValues>({});

export const InternetGatewayForm: React.SFC<IProps> = ({ internetGateway }) => {
  const dispatch = useDispatch();
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {},
    onSubmit: values => {
      if (internetGateway) {
        internetGateway.update({
          properties: values
        });
        dispatch(
          awsActions.internetGateway.update({
            internetGatewayId: internetGateway.id,
            internetGatewayView: {
              resource: internetGateway
            }
          })
        );
      } else {
        dispatch(
          awsActions.internetGateway.create({
            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.5,
            width: 100,
            height: 100,
            resource: new InternetGateway({
              properties: {},
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
      <Button
        type="submit"
        value={internetGateway ? "更新" : "作成"}
        onClick={() => {}}
      />
      {internetGateway ? (
        <Button
          value="削除"
          onClick={() => {
            dispatch(awsActions.internetGateway.remove(internetGateway.id));
            dispatch(uiActions.removeModal());
          }}
        />
      ) : null}
    </form>
  );
};
