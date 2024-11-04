import React, { useContext, useState } from "react";
import logo from "../assets/image1.png";
import { ImCross } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const Nav = () => {
  const { showMenu, setShowMenu, user  } = useContext(UserContext);

  const navigate = useNavigate();
  function showNav() {}
  return (
    <div className="w-full relative flex items-center">
      <div className="flex w-full justify-between md:justify-between items-start md:items-center md:px-14 ">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="Logo"
          className="md:w-[12rem] w-[8rem] z-10"
        />

        <ul className="text-white hidden lg:flex  space-x-14 items-center cursor-pointer">

          <li className="text-lg font-serif font-bold"><NavLink to={"/"}>Home</NavLink></li>
          <li className="text-lg font-serif font-bold">Our Menu</li>
          <li className="text-lg font-serif font-bold">Maps</li>
          <li className="text-lg font-serif font-bold">About</li>
          <li className="text-lg font-serif font-bold">Contact</li>
                 </ul>

                 <div className={`${user && user?.img?.length > 0 ? "hidden " : "block"} `}>
                    <div className={`  md:block hidden space-x-4 `}>
          <button className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md  transition duration-200 ease-linear text-xl font-serif font-bold">
            <NavLink to="/signIn">Login</NavLink>
          </button>
          <button className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md  transition duration-200 ease-linear text-xl font-serif font-bold">
            <NavLink to="/signup">Sign up</NavLink>
          </button>
        </div>
                 </div>

        <div onClick={() => setShowMenu(!showMenu)} className="md:hidden z-10">
          <div
            className={`${
              showMenu ? "hidden" : "flex"
            } gap-[5px] flex-col justify-end items-end pt-7 pr-3`}
          >
            <div className="w-11  border-white border-[1.7px] rounded-lg"></div>
            <div className="w-8  border-white border-[1.7px] rounded-lg"></div>
            <div className="w-6  border-white border-[1.7px] rounded-lg"></div>
          </div>
          <div
            className={`${
              !showMenu ? "hidden" : "flex-col"
            } z-10 gap-[5px] justify-end items-end pt-7 pr-3`}
          >
            <ImCross className="text-3xl" />
          </div>
        </div>
      </div>
      <ul
        className={`${
          !showMenu ? "hidden" : "flex"
        } ' absolute w-full top-0 text-black bg-gradient-to-r from-stone-50 to-neutral-200 flex flex-col justify-center items-center  space-y-2 pt-20 pb-5 text-center cursor-pointer`}
      >
        <li className="text-lg font-serif font-bold">Our Menu</li>
        <li className="text-lg font-serif font-bold">Maps</li>
        <li className="text-lg font-serif font-bold">About</li>
        <li className="text-lg font-serif font-bold">Contact</li>
        <button
          onClick={() => {
            navigate("/signIn");
            setShowMenu(false);
          }}
          className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md  transition duration-200 ease-linear text-xl font-serif font-bold"
        >
          login
        </button>
        <button
          onClick={() => {
            navigate("/signup");
            setShowMenu(false);
          }}
          className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md  transition duration-200 ease-linear text-xl font-serif font-bold"
        >
          Register
        </button>
      </ul>

      {user && user?.img.length > 0 && (
        <div className="md:pr-10 pr-4 lg:w-[40%] float-right flex justify-end">
          <img src={user.img} className="w-12 rounded-full" alt="" />
        </div>
      )}
    </div>
  );
};

export default Nav;
