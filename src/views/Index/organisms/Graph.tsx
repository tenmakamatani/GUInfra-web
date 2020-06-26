import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { awsSelector, awsActions } from "@modules/aws";
import { uiActions, ModalTypes } from "@modules/ui";

import { ScopeResourceItem } from "../atoms/ScopeResourceItem";

import { styles } from "../styles";

export const Graph: React.SFC = () => {
  const dispatch = useDispatch();
  const awsResources = useSelector(awsSelector.selectAll);
  console.log(awsResources);
  return (
    <div css={styles.graph.wrapper}>
      {awsResources.vpcList.map(vpc => (
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
      ))}
    </div>
  );
};
