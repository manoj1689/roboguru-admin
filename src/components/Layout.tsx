
"use client"; // This ensures that this component is a Client Component

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../redux/store"; // Adjust the path to your store
import Sidebar from "../components/Sidebar";
import AdminNavBar from "../components/AdminNavBar"
import "../styles/globals.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Provider store={store}>
      <div>
        <div>
          <AdminNavBar />

        </div>
        <div className=" ">
          <Sidebar />
        </div>
        <div className="flex flex-col lg:ml-64 p-4  pt-24">
          {children}
        </div>

      </div>
    </Provider>
  );
};

export default Layout;