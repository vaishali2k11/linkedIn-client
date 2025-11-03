import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Advertisement } from "../../components/Advertisement/Advertisement";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { Card } from "../../components/Card/Card";

export const Notifications = () => {
  const navigate = useNavigate();
  const [ownData, setOwnData] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);
    handleToFetchNotificationDataApi();
  }, []);

  const handleToFetchNotificationDataApi = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/notification/get-notification`,
        { withCredentials: true }
      );

      if (response) {
        setNotifications(response?.data?.notifications);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Failed to copy the link!");
    }
  };

  const handleOnClickNotification = async (item) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/notification/update-notification-read-status`,
        {
          notificationId: item?._id,
        },
        { withCredentials: true }
      );

      if (response) {
        if (item.type === "comment") {
          navigate(`/profile/${ownData?._id}/activities/${item?.postId}`);
        } else {
          navigate("/my-network");
        }
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Failed to copy the link!");
    }
  };

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard data={ownData} />
        </div>
      </div>

      {/* Middle Side */}
      <div className="w-full py-5 sm:w-[50%]">
        {/* Notifications List */}
        <div>
          <Card padding={0}>
            <div className="w-full">
              {/* For each notification */}
              {notifications?.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      onClick={() => handleOnClickNotification(item)}
                      className={`border-b cursor-pointer flex gap-4 items-center border-gray-300 p-3 ${
                        item?.is_read ? "bg-gray-200" : "bg-blue-100"
                      }`}
                    >
                      <img
                        src={item?.sender?.profile_pic}
                        alt="profile photo"
                        className="rounded-full cursor-pointer w-15 h-15"
                      />
                      <div>{item?.content}</div>
                    </div>
                  </>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Right Side */}

      <div className="w-[26%] py-5 hidden md:block">
        <div className="my-5 sticky top-19">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};
