import { Link } from "react-router-dom";
import Loading from "../components/ui/Loading";
import { useGetMyHotel } from "../lib/queryHooks/myHotel.hooks";
import { HotelFormData } from "../lib/types";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotel = () => {
  const { data: hotelData, isLoading } = useGetMyHotel();

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </div>
      {hotelData?.length === 0 ? (
        <div className="flex items-center flex-col w-full h-96 justify-center">
          <span className="underline font-semibold text-gray-600">
            No Hotels found...
          </span>

          <p className="font-xl">Create use Add Hotel</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {hotelData.map((hotel: HotelFormData) => (
            <div
              data-testid="hotel-card"
              className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            >
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-3 flex capitalize items-center">
                  <BsMap className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1" />₹{hotel.pricePerNight} per night
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiHotel className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiStar className="mr-1" />
                  {hotel.starRating} Star Rating
                </div>
              </div>
              <div className="flex items-center justify-end gap-6">
                <Link
                  to={`/hotel/${hotel._id}`}
                  className="flex bg-blue-600 rounded text-white text-sm font-bold px-2 py-4 hover:bg-blue-500"
                >
                  View Details
                </Link>

                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  target="_blank"
                  className="flex bg-red-600 rounded text-white text-sm font-bold px-10 py-4 hover:bg-red-500"
                >
                  Edit
                </Link>

                <button className="flex bg-green-600 rounded text-white text-sm font-bold px-8 py-4 hover:bg-green-500">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHotel;
