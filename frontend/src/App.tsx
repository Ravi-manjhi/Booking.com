import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import RootLayout from "./pages/RootLayout";
import AuthLayout from "./auth/AuthLayout";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
