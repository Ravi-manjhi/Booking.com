import React, { useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { useSearchHotels } from "../lib/queryHooks/hotels.hooks";
import SearchResultCard from "../components/search/SearchResultCard";
import { IHotelFormData } from "../lib/types";
import Pagination from "../components/ui/Pagination";
import StarRatingFilter from "../components/ui/StarRatingFilter";
import HotelTypesFilter from "../components/ui/HotelTypes";
import FacilitiesFilter from "../components/ui/FacilitiesFilter";
import PriceFilter from "../components/ui/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStar, setSelectedStar] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(
    undefined
  );
  const [sortOption, setSortOption] = useState<string>("default");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    childCount: search.childCount.toString(),
    adultCount: search.adultCount.toString(),
    page: page.toString(),
    stars: selectedStar,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice,
    sortOptions: sortOption,
  };
  const { data: hotelData } = useSearchHotels(searchParams);

  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStar((pre) =>
      event.target.checked
        ? [...pre, starRating]
        : pre.filter((el) => el !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((pre) =>
      event.target.checked
        ? [...pre, hotelType]
        : pre.filter((el) => el !== hotelType)
    );
  };

  const handleHotelFacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facility = event.target.value;

    setSelectedFacilities((pre) =>
      event.target.checked
        ? [...pre, facility]
        : pre.filter((el) => el !== facility)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 max-h-[65rem] sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by
          </h3>
          <StarRatingFilter
            selectedStar={selectedStar}
            onChange={handleStarChange}
          />

          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
        </div>

        <FacilitiesFilter
          onChange={handleHotelFacilitiesChange}
          selectedFacilities={selectedFacilities}
        />
        <PriceFilter
          selectedPrice={selectedPrice}
          onChange={setSelectedPrice}
        />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            {hotelData?.pagination?.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </div>
          <div>
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Sort By</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">
                Price Per Night (low to high)
              </option>
              <option value="pricePerNightDesc">
                Price Per Night (high to low)
              </option>
            </select>
          </div>
        </div>
        {hotelData?.data.map((hotel: IHotelFormData) => (
          <SearchResultCard hotel={hotel} key={hotel._id} />
        ))}
        <Pagination
          page={hotelData?.pagination.page || 1}
          pages={hotelData?.pagination.pages || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Search;
