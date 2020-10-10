import * as React from "react";
import { useDispatch } from "react-redux";

import config from "@config";
import { awsActions } from "@modules/aws";
import { IEC2View } from "@modules/aws/resources";
import { uiActions, ModalTypes } from "@modules/ui";

import { EntityResourceItem } from "../../atoms/EntityResourceItem";

interface IProps {
  ec2: IEC2View;
}

export const EC2Item: React.SFC<IProps> = ({ ec2 }) => {
  const dispatch = useDispatch();
  return (
    <EntityResourceItem
      tip={ec2.resource.properties.name}
      source={config.images.ec2}
      resource={ec2}
      onDragStop={(e, data) => {
        if (Math.abs(data.x - ec2.x) < 5 && Math.abs(data.y - ec2.y) < 5) {
          dispatch(
            uiActions.appearModal({
              type: ModalTypes.EC2Form,
              resource: ec2.resource
            })
          );
          return;
        }
        dispatch(
          awsActions.ec2.update({
            ec2Id: ec2.resource.id,
            ec2View: {
              x: data.x,
              y: data.y
            }
          })
        );
      }}
      onResizeStop={(e, dir, elementRef, delta, position) => {
        if (delta.width === ec2.width && delta.height === ec2.height) {
          return;
        }
        dispatch(
          awsActions.ec2.update({
            ec2Id: ec2.resource.id,
            ec2View: {
              width: delta.width,
              height: delta.height
            }
          })
        );
      }}
    />
  );
};
