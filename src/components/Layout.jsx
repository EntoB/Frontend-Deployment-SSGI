import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ isLogged, onLogout }) => {
  return (
    <div>
      <Header isLogged={isLogged} onLogout={onLogout} />
      <main className="bg-sky-50 py-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
