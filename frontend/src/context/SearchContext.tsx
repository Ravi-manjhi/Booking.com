/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";
import { ISearchContext } from "../lib/types";

type SearchContextProvider = {
  children: React.ReactNode;
};

const SearchContext = React.createContext<ISearchContext | undefined>(
  undefined
);

export const SearchContextProvider = ({ children }: SearchContextProvider) => {
  const [destination, setDestination] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [hotelId, setHotelId] = useState<string>("");

  const saveSearchValue = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);

    if (hotelId) {
      setHotelId(hotelId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        hotelId,
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        saveSearchValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as ISearchContext;
};
