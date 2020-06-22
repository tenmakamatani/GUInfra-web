import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";

import { uiActions, uiSelectors } from "../../modules/ui";

ReactModal.setAppElement("#root");
export const Modal: React.SFC = () => {
  const dispatch = useDispatch();
  const modal = useSelector(uiSelectors.modal);
  return (
    <ReactModal
      isOpen={modal.isOpen}
      style={{
        content: {
          width: "50%",
          height: "50%",
          margin: "auto"
        },
        overlay: {
          backgroundColor: "rgba(255, 255, 255, 0.75)"
        }
      }}
      onRequestClose={() => {
        dispatch(uiActions.removeModal());
      }}
      // css={styles.modal.modal}
    >
      <h2>aiueo</h2>
    </ReactModal>
  );
};
