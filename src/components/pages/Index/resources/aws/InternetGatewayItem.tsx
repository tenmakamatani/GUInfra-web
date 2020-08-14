import * as React from "react";
import { useDispatch } from "react-redux";

import config from "@config";
import { awsActions } from "@modules/aws";
import { IInternetGatewayView } from "@modules/aws/resources";
import { uiActions, ModalTypes } from "@modules/ui";

import { EntityResourceItem } from "../../atoms/EntityResourceItem";

interface IProps {
  internetGateway: IInternetGatewayView;
}

export const InternetGatewayItem: React.SFC<IProps> = ({ internetGateway }) => {
  const dispatch = useDispatch();
  return (
    <EntityResourceItem
      source={config.images.internetGateway}
      resource={internetGateway}
      onDragStop={(e, data) => {
        if (
          Math.abs(data.x - internetGateway.x) < 5 &&
          Math.abs(data.y - internetGateway.y) < 5
        ) {
          dispatch(
            uiActions.appearModal({
              type: ModalTypes.InternetGatewayForm,
              resource: internetGateway.resource
            })
          );
          return;
        }
        dispatch(
          awsActions.internetGateway.update({
            internetGatewayId: internetGateway.resource.id,
            internetGatewayView: {
              x: data.x,
              y: data.y
            }
          })
        );
      }}
      onResizeStop={(e, dir, elementRef, delta, position) => {
        if (
          delta.width === internetGateway.width &&
          delta.height === internetGateway.height
        ) {
          return;
        }
        dispatch(
          awsActions.internetGateway.update({
            internetGatewayId: internetGateway.resource.id,
            internetGatewayView: {
              width: delta.width,
              height: delta.height
            }
          })
        );
      }}
    />
  );
};
