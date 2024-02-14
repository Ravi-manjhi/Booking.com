import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="mx-auto container flex-1 py-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
