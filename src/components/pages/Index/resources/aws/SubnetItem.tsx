import * as React from "react";
import { useDispatch } from "react-redux";

import { awsActions } from "@modules/aws";
import { ISubnetView } from "@modules/aws/resources";
import { uiActions, ModalTypes } from "@modules/ui";

import { ScopeResourceItem } from "../../atoms/ScopeResourceItem";

interface IProps {
  subnet: ISubnetView;
}

export const SubnetItem: React.SFC<IProps> = ({ subnet }) => {
  const dispatch = useDispatch();
  return (
    <ScopeResourceItem
      tip={subnet.resource.properties.name}
      resource={subnet}
      onDragStop={(e, data) => {
        if (
          Math.abs(data.x - subnet.x) < 5 &&
          Math.abs(data.y - subnet.y) < 5
        ) {
          dispatch(
            uiActions.appearModal({
              type: ModalTypes.SubnetForm,
              resource: subnet.resource
            })
          );
          return;
        }
        dispatch(
          awsActions.subnet.update({
            subnetId: subnet.resource.id,
            subnetView: {
              x: data.x,
              y: data.y
            }
          })
        );
      }}
      onResizeStop={(e, dir, elementRef, delta, position) => {
        if (delta.width === subnet.width && delta.height === subnet.height) {
          return;
        }
        dispatch(
          awsActions.subnet.update({
            subnetId: subnet.resource.id,
            subnetView: {
              width: delta.width,
              height: delta.height
            }
          })
        );
      }}
    />
  );
};
