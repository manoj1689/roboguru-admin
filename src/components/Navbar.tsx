import React from "react";
import { useRouter } from "next/router";

const Navbar = () => {

  const router = useRouter();

  const handleSignIn = () => {
    router.push("/superAdmin");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full bg-transparent bg-opacity-80 text-white p-4 h-20 px-8 fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center">
        {/* Left section with logo */}
        <div className="w-1/3 flex justify-start">
          <div className="text-3xl font-bold text-stone-200 cursor-pointer">
            Robo Guru
          </div>
        </div>

        {/* Right section with Sign In/Sign Up */}
        <div className="flex w-2/3 space-x-4 justify-end">
          {/* Sign In Button with Cyan Border */}
          <div
            className="bg-transparent hover:bg-cyan-600 text-cyan-600 hover:text-white border-2 border-cyan-600 px-4 py-2 rounded-md cursor-pointer"
            onClick={handleSignIn} // Navigate to /login
          >
            Sign In
          </div>

          {/* Sign Up Button with Cyan Color */}
          <div
            className="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => router.push("/signup")} // Navigate to /signup
          >
            Sign Up
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



