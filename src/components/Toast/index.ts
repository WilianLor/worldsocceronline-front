import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Toast = (text: string, type: boolean) => {
  if (type) {
    toast.success(text);
  } else {
    toast.error(text);
  }
};

export default Toast;
