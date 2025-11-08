import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

import "./Navbar2.css";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";


export const Navbar2 = ({ doRefetchNotification }) => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTerm, setDebounceTerm] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceTerm(searchTerm);
    }, 1000);

    () => setTimeout(id);
  }, [searchTerm]);

  useEffect(() => {
    if (debounceTerm) {
      handleToSearchApiCall();
    }
  }, [debounceTerm]);

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);
  
  useEffect(() => {
    handleToFetchNotification();
  },[doRefetchNotification])

  const handleToFetchNotification = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/notification/unread-notification`,
        { withCredentials: true }
      );

      if (response) {
        setNotificationCount(response?.data?.count);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleToSearchApiCall = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/auth/find-user?query=${debounceTerm}`,
        { withCredentials: true }
      );

      if (response && response.data && response.data.users && response.data.users.length) {
        setSearchUser(response?.data?.users);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-white h-[52px] flex justify-between py-1 px-5 xl:px-50 fixed top-0 w-full z-100">
      <div className="flex gap-2 items-center">
        <Link to={"/feeds"}>
          <img
            src={"/Logo/linkedIn-logo.png"}
            alt="LinkedInLogo"
            className="w-8 h-8"
          />
        </Link>
        <div className="relative">
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="searchInput w-70 bg-gray-100 rounded-sm h-10 px-4"
            type="text"
            placeholder="Search"
          />

          {searchUser?.length > 0 && debounceTerm.length !== 0 && (
            <>
              <div className="absolute w-88 left-0 bg-gray-200">
                {searchUser.map((item, index) => {
                  return (
                      <Link
                        onClick={() => setSearchTerm("")}
                        to={`/profile/${item?._id}`}
                        key={index}
                        className="flex gap-2 mb-1 items-center cursor-pointer"
                      >
                        <div>
                          <img
                            src={item?.profile_pic}
                            alt="Profile Logo"
                            className="w-10 h-10 rounded-full border-gray-200 "
                          />
                        </div>
                        <div>{item?.f_name}</div>
                      </Link>
                  );
                })}
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
            {notificationCount > 0 && (
              <>
                <span className="p-1 rounded-full text-sm bg-red-700 text-white">
                  {notificationCount}
                </span>
              </>
            )}{" "}
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
          to={`/profile/${userData?._id}`}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            src={userData?.profile_pic}
            alt="Profile Logo"
            className="w-6 h-6 rounded-full"
          />
          <div className="text-sm text-gray-500">Me</div>
        </Link>
      </div>
    </div>
  );
};
