import * as React from "react";
import { useDispatch } from "react-redux";

import { awsActions } from "@modules/aws";
import { IVPCView } from "@modules/aws/resources";
import { uiActions, ModalTypes } from "@modules/ui";

import { ScopeResourceItem } from "../../atoms/ScopeResourceItem";

interface IProps {
  vpc: IVPCView;
}

export const VPCItem: React.SFC<IProps> = ({ vpc }) => {
  const dispatch = useDispatch();
  return (
    <ScopeResourceItem
      key={vpc.resource.id.value}
      resource={vpc}
      onDragStop={(e, data) => {
        if (Math.abs(data.x - vpc.x) < 5 && Math.abs(data.y - vpc.y) < 5) {
          dispatch(
            uiActions.appearModal({
              type: ModalTypes.VPCForm,
              resource: vpc.resource
            })
          );
          return;
        }
        dispatch(
          awsActions.vpc.update({
            vpcId: vpc.resource.id,
            vpcView: {
              x: data.x,
              y: data.y
            }
          })
        );
      }}
      onResizeStop={(e, dir, elementRef, delta, position) => {
        if (delta.width === vpc.width && delta.height === vpc.height) {
          return;
        }
        dispatch(
          awsActions.vpc.update({
            vpcId: vpc.resource.id,
            vpcView: {
              width: delta.width,
              height: delta.height
            }
          })
        );
      }}
    />
  );
};
