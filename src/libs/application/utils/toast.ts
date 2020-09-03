import { toast as reactToast } from "react-toastify";

const success = (val: string): void => {
  reactToast.success(val);
};
const error = (val: string): void => {
  reactToast.error(val);
};

export const toast = {
  success,
  error
};
