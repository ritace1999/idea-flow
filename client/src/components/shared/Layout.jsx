import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const location = useLocation();

  const noSidebarRoutes = ["/", "/login", "/signup"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1">
        {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
