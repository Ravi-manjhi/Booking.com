export type IRegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ISignINForm = {
  email: string;
  password: string;
};

export type ToastMessage = {
  message: string;
  type: "Success" | "Error";
};

export type IAppContext = {
  showToast: (ToastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

export type ToastProps = {
  message: string;
  type: "Success" | "Error";
  onClose: () => void;
};
