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

export type IToastMessage = {
  message: string;
  type: "Success" | "Error";
};

export type IAppContext = {
  showToast: (ToastMessage: IToastMessage) => void;
  isLoggedIn: boolean;
  isLoading: boolean;
};

export type IToastProps = {
  message: string;
  type: "Success" | "Error";
  onClose: () => void;
};

export type IHotelFormData = {
  _id?: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls?: string[];
  adultCount: number;
  childCount: number;
};

export type IHotelSearchResponse = {
  data: IHotelFormData[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type ISearchContext = {
  hotelId: string;
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  saveSearchValue: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};

export type ISearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: number | undefined;
  sortOptions?: string;
};

export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export type StarRatingProps = {
  selectedStar: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
