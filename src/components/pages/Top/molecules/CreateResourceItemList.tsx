import * as React from "react";
import { useDispatch } from "react-redux";

import { awsActions } from "@modules/aws";
import { Button, Margin } from "@components/atoms";
import styles from "../styles";
import { CreateResourceItem, IResource } from "../atoms/CreateResourceItem";

interface IProps {
  resources: IResource[];
}

export const CreateResourceItemList: React.SFC<IProps> = props => {
  const dispatch = useDispatch();
  return (
    <div css={styles.createResourceItemList.wrapper}>
      {props.resources.map(resource => (
        <CreateResourceItem
          key={resource.source}
          name={resource.name}
          modalType={resource.modalType}
          source={resource.source}
        />
      ))}
      <div>
        <Margin height={40} />
        <Button
          value="サンプル作成"
          inverted
          onClick={() => {
            dispatch(awsActions.sample.create())
          }}
        />
      </div>
    </div>
  )
}
