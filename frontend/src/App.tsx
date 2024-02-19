import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import RootLayout from "./pages/RootLayout";
import AuthLayout from "./auth/AuthLayout";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import AddHotel from "./pages/AddHotel";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import IsSignInRouter from "./components/protected/IsSignInRouter";
import MyHotel from "./pages/MyHotel";
import EditHotel from "./pages/EditHotel";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Route>

        <Route
          element={
            <IsSignInRouter>
              <AuthLayout />
            </IsSignInRouter>
          }
        >
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>

        {/* protected route */}
        <Route
          element={
            <ProtectedRoute>
              <AuthLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/my-hotels" element={<MyHotel />} />
          <Route path="/edit-hotel/:id" element={<EditHotel />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
