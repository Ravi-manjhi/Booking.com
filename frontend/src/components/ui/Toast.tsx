import { IToastProps } from "../../lib/types";
import { useEffect } from "react";

const Toast = ({ message, type, onClose }: IToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles =
    type === "Success"
      ? "fixed top-4 rounded right-4 z-50 p-4 bg-green-600 text-white max-w-md"
      : "fixed top-4 rounded right-4 z-50 p-4 bg-red-600 text-white max-w-md";
  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
