import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/base/toast";
import { PropsWithChildren, createContext, useState } from "react";

type ActionParams = {
  title: string;
  msg: string;
  sucess?: boolean;
};

export const ToastContext = createContext({
  handleToast: (params: ActionParams) => {},
});

export function ToastProvider({ children }: PropsWithChildren) {
  const toast = useToast();
  const [toastId, setToastId] = useState(0);

  const handleToast = (params: ActionParams) => {
    if (!toast.isActive(toastId.toString())) {
      showNewToast(params);
    }
  };

  const showNewToast = ({ sucess, title, msg }: ActionParams) => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      placement: "top",
      id: newId.toString(),
      duration: 3000,
      render: ({}) => {
        const uniqueToastId = "toast-" + newId;
        const isSucess = sucess ? "bg-green-600" : "bg-red-600";

        return (
          <Toast
            className={`${isSucess} z-50 pt-[50%]`}
            nativeID={uniqueToastId}
            action="muted"
            variant="solid"
          >
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{msg}</ToastDescription>
          </Toast>
        );
      },
    });
  };

  return (
    <ToastContext.Provider
      value={{
        handleToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
