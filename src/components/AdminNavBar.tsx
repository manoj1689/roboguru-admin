// components/Navbar.tsx
"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authslice";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router"; 
import { FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Navbar = () => {
    const dispatch = useDispatch();
     const router = useRouter();
  // Sample search data
  const items = [
    { id: 0, name: "Education Level" },
    { id: 1, name: "Class 1" },
    { id: 2, name: "Mathematics" },
    { id: 3, name: "Algebra Chapter" },
    { id: 4, name: "Linear Equations Topic" },
  ];
  const [isProfile, setisProfile] = useState(false);
  const toggleProfile = () => {
    setisProfile(!isProfile);
  };
  const handleOnSelect = (item: { id: number; name: string }) => {
    console.log("Selected item:", item);
    // Navigate to a specific page or fetch data based on the item
  };
 

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Redirect to the login page after logout
    router.push("/");
  };

  return (
    <div className="fixed z-10 w-full h-fit md:h-20 bg-[#F3F3F3] shadow-md  md:px-6 pl-6 md:py-3 flex justify-between">
      {/* Logo Section */}
      <div className="hidden lg:flex lg:w-1/4  px-4  items-center  ">
        <img src="/robologo.png" alt="logo" className="w-32 lg:w-40 " />
      </div>

      {/* Search Bar */}
      <div className="hidden sm:w-2/4 lg:flex items-center">
        <div className="w-5/6">
          <ReactSearchAutocomplete
            items={items}
            onSelect={handleOnSelect}
            placeholder="Search for topis chapters or subjects"
            styling={{
              border: "", // Tailwind's border-gray-300
              borderRadius: "5px",
              boxShadow: "none",
              backgroundColor: "white",
              hoverBackgroundColor: "#EEE", // Tailwind's bg-gray-100
              color: "#1f2937", // Tailwind's text-gray-800
              zIndex: 2,
            }}
          />
        </div>

      </div>

      {/* User Info and Notifications */}
      <div className="w-full lg:w-1/4 flex  justify-between pr-2 md:pr-4 lg:justify-end  md:items-center space-x-4 ">

        <div className="lg:hidden bg-transparent p-4 justify-center item-center ml-1 rounded-lg">
          <img src="/robologo.png" alt="logo" className="w-32" />
        </div>
        <div className="flex gap-2 md:gap-4 items-center ">
          <div className="relative">
            <FaBell className="md:w-6 md:h-6 w-4 h-4 text-yellow-400 cursor-pointer" />
            {/* Notification Badge */}
            <span className="absolute top-0 right-0 block md:h-2 md:w-2 h-1 w-1 rounded-full bg-red-500"></span>
          </div>

          <Popup
            trigger={
              <button className=" text-[#63A7D4]  rounded-md">
                <TiArrowSortedDown size={22} />
              </button>
            }
            position="bottom right"
          ><div className=" flex flex-col  px-8 py-2">
              <div className="flex lg:hidden items-center gap-2  text-[#63A7D4]">
                <span>Notification</span>
              </div>
              <div className="flex lg:hidden text-[#63A7D4]  ">
                <span><img src="/images/chatlogo.png" alt="chat logo" className="w-4" /></span>
                <span className="font-semibold">Live Chat</span>
              </div>
              <div className="flex w-full text-[#63A7D4] ">
                update Profile
              </div>
              {/* Logout Button */}
              <div className="w-full flex h-1/6 items-center justify-center px-4">
                <button
                  onClick={handleLogout}
                  className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>

          </Popup>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
