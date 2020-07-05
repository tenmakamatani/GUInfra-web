import * as React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

import { uiActions } from "@modules/ui";

const validation = Yup.object().shape({
  accessKeyId: Yup.string().required("※アクセスキーを入力してください"),
  secretAccessKey: Yup.string().required("※シークレットキーを入力してください")
});

interface IFormValues {
  accessKeyId: string;
  secretAccessKey: string;
}

export const MetadataForm: React.SFC = () => {
  const dispatch = useDispatch();
  const formik = useFormik<IFormValues>({
    validationSchema: validation,
    initialValues: {
      accessKeyId: "",
      secretAccessKey: ""
    },
    onSubmit: values => {
      console.log(values);
      dispatch(uiActions.removeModal());
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="accessKeyId"
        type="text"
        placeholder="アクセスキー"
        value={formik.values.accessKeyId}
        onChange={formik.handleChange}
      />
      <p>{formik.errors.accessKeyId}</p>
      <input
        name="secretAccessKey"
        type="text"
        placeholder="シークレットキー"
        value={formik.values.secretAccessKey}
        onChange={formik.handleChange}
      />
      <p>{formik.errors.secretAccessKey}</p>
      <button type="submit">作成</button>
    </form>
  );
};
