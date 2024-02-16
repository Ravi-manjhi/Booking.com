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
  isLoading: boolean;
};

export type ToastProps = {
  message: string;
  type: "Success" | "Error";
  onClose: () => void;
};

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};
