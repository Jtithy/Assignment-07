import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ToastHost from "../components/ToastHost";

function MainLayout() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <ToastHost />
    </div>
  );
}

export default MainLayout;
