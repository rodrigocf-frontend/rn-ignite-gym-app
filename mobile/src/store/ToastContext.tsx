import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/base/toast";
import { PropsWithChildren, createContext, useState } from "react";
import { StatusBar } from "react-native";

export type ToastActionParams = {
  title: string;
  msg: string;
  sucess?: boolean;
};

export const ToastContext = createContext({
  handleToast: (params: ToastActionParams) => {},
});

export function ToastProvider({ children }: PropsWithChildren) {
  const toast = useToast();
  const [toastId, setToastId] = useState(0);

  const handleToast = (params: ToastActionParams) => {
    if (!toast.isActive(toastId.toString())) {
      showNewToast(params);
    }
  };

  const showNewToast = ({ sucess, title, msg }: ToastActionParams) => {
    const margin = StatusBar.currentHeight
      ? StatusBar.currentHeight + 50
      : "auto";

    const newId = Math.random();
    setToastId(newId);
    toast.show({
      containerStyle: {
        marginTop: margin,
      },
      placement: "top",
      id: newId.toString(),
      duration: 2000,
      render: ({}) => {
        const uniqueToastId = "toast-" + newId;
        const isSucess = sucess ? "bg-green-600" : "bg-red-600";

        return (
          <Toast
            className={`${isSucess} z-50`}
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
