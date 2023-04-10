
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function ErrorToast({message}: {message: string}) {
  const toastId = useRef(false);
  useEffect(() => {
    if (message) {
      if (!toastId.current) {
        toastId.current = true;
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, []);
  return (
    <div>
        <ToastContainer />
    </div>
  );
}