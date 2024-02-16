import react, { createContext, useContext, useState } from "react";
import { IAppContext, ToastMessage } from "../lib/types";
import { useCheckLoggedIn } from "../lib/queryHooks/auth.hooks";
import Toast from "../components/ui/Toast";

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: react.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const onClose = () => {
    setToast(undefined);
  };

  const { data, isLoading } = useCheckLoggedIn();

  return (
    <AppContext.Provider
      value={{
        showToast: (ToastMessage) => {
          setToast(ToastMessage);
        },

        isLoggedIn: data?.userId,
        isLoading: isLoading,
      }}
    >
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={onClose} />
      )}
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  const context = useContext(AppContext);
  return context as IAppContext;
};
