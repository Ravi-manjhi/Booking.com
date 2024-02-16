import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/AppContext";
import SignOutButton from "../ui/SignOutButton";

function Header() {
  const { isLoggedIn } = useGlobalContext();
  return (
    <header className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <h2 className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Booking.com</Link>
        </h2>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center rounded-md text-white px-3 font-bold hover:bg-white hover:text-blue-600"
                to="/my-bookings"
              >
                My Booking
              </Link>
              <Link
                className="flex items-center  rounded-md text-white px-3 font-bold hover:bg-white  hover:text-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-white rounded-md text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign-In
            </Link>
          )}
        </span>
      </div>
    </header>
  );
}

export default Header;
