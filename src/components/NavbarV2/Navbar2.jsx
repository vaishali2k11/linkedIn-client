import { useState } from "react";
import "./Navbar2.css";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const Navbar2 = () => {
  const [dropdown, setDropdown] = useState(false);

  const location = useLocation();
  return (
    <div className="bg-white h-[52px] flex justify-between py-1 px-5 xl:px-50 fixed top-0 w-full z-100">
      <div className="flex gap-2 items-center">
        <Link to={"/"}>
          <img
            src={"/Logo/linkedIn-logo.png"}
            alt="LinkedInLogo"
            className="w-8 h-8"
          />
        </Link>
        <div className="relative">
          <input
            className="searchInput w-70 bg-gray-100 rounded-sm h-10 px-4"
            type="text"
            placeholder="Search"
          />

          {dropdown && (
            <>
              <div className="absolute w-88 left-0 bg-gray-200">
                <div className="flex gap-2 mb-1 items-center cursor-pointer">
                  <div>
                    <img
                      src="https://avatar.iran.liara.run/public/boy?username=Ash"
                      alt="Profile Logo"
                      className="w-10 h-10 rounded-full border-gray-200 "
                    />
                  </div>
                  <div>User1</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="hidden gap-10 md:flex">
        <Link
          to={"/feeds"}
          className="flex flex-col items-center cursor-pointer"
        >
          <HomeIcon
            sx={{ color: location.pathname === "/feeds" ? "black" : "gray" }}
          />
          <div
            className={`text-sm text-gray-500 ${
              location.pathname === "/feeds" ? "border-b-4" : ""
            }`}
          >
            Home
          </div>
        </Link>
        <Link
          to={"/my-network"}
          className="flex flex-col items-center cursor-pointer"
        >
          <GroupIcon
            sx={{
              color: location.pathname === "/my-network" ? "black" : "gray",
            }}
          />
          <div
            className={`text-sm text-gray-500 ${
              location.pathname === "/my-network" ? "border-b-4" : ""
            }`}
          >
            My Network
          </div>
        </Link>
        <Link
          to={"/resume"}
          className="flex flex-col items-center cursor-pointer"
        >
          <WorkOutlineIcon
            sx={{ color: location.pathname === "/resume" ? "black" : "gray" }}
          />
          <div
            className={`text-sm text-gray-500 ${
              location.pathname === "/resume" ? "border-b-4" : ""
            }`}
          >
            Resume
          </div>
        </Link>
        <Link
          to={"/messages"}
          className="flex flex-col items-center cursor-pointer"
        >
          <MessageIcon
            sx={{ color: location.pathname === "/messages" ? "black" : "gray" }}
          />
          <div
            className={`text-sm text-gray-500 ${
              location.pathname === "/messages" ? "border-b-4" : ""
            }`}
          >
            Message
          </div>
        </Link>
        <Link
          to={"/notification"}
          className="flex flex-col items-center cursor-pointer"
        >
          <div>
            <NotificationsActiveIcon
              sx={{
                color: location.pathname === "/notification" ? "black" : "gray",
              }}
            />{" "}
            <span className="p-1 rounded-full text-sm bg-red-700 text-white">
              1
            </span>{" "}
          </div>
          <div
            className={`text-sm text-gray-500 ${
              location.pathname === "/notification" ? "border-b-4" : ""
            }`}
          >
            Notification
          </div>
        </Link>
        <Link
          to={`/profile/12345`}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            src="https://avatar.iran.liara.run/public/boy?username=Ash"
            alt="Profile Logo"
            className="w-6 h-6 rounded-full"
          />
          <div className="text-sm text-gray-500">Me</div>
        </Link>
      </div>
    </div>
  );
};
