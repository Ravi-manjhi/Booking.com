import { Outlet } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="mx-auto container flex-1 py-10">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default AuthLayout;
