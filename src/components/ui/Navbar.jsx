import React from "react";
import cs from "../../assets/navbar/coffe.svg";
import { NavLink, useLocation } from "react-router";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <section
      className={`fixed top-0 z-50 w-full backdrop-blur-md transition-colors duration-300 ${
        isHome
          ? "bg-black/40 text-white"
          : "bg-black text-white"
      }`}
    >
      <div className="flex flex-col gap-4 px-4 py-3 lg:grid lg:grid-cols-2 lg:px-20 lg:py-5">

        {/* LEFT SIDE */}
        <div className="flex items-center justify-between lg:justify-start gap-6">
          <img src={cs} alt="coffe shop" className="h-8" />

          <div className="flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-2 pb-1 cursor-pointer ${
                  isActive ? "border-b-2 border-orange-400" : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/product"
              className={({ isActive }) =>
                `px-2 pb-1 cursor-pointer ${
                  isActive ? "border-b-2 border-orange-400" : ""
                }`
              }
            >
              Product
            </NavLink>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center lg:justify-end gap-4">
          <NavLink
            to="/login"
            className="rounded-md border border-current px-4 py-2 transition duration-200 hover:scale-105 hover:bg-white hover:text-black"
          >
            Sign In
          </NavLink>

          <NavLink
            to="/register"
            className="rounded-md bg-orange-400 px-4 py-2 text-black transition duration-200 hover:scale-105 hover:bg-orange-500"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </section>
  );
}
