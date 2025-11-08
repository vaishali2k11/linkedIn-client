import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Advertisement } from "../../components/Advertisement/Advertisement";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { Card } from "../../components/Card/Card";

export const Notifications = ({ setDoRefetchNotification }) => {
  const navigate = useNavigate();
  const [ownData, setOwnData] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);
    fetchNotificationDataApi();
  }, []);

  const fetchNotificationDataApi = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/notification/get-notification`,
        { withCredentials: true }
      );

      if (response && response.data && response.data.notifications && response.data.notifications.length) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Failed to copy the link!");
    }
  };

  const handleOnClickNotification = async (item) => {
    try {
      if (item && !item.is_read) {
        const response = await axios.put(
          `http://localhost:8080/api/notification/update-notification-read-status`,
          {
            notificationId: item?._id,
          },
          { withCredentials: true }
        );

        if (response) {
          if (item.type === "comment") {
            console.log("Here...")
            navigate(`/profile/${ownData?._id}/activities/${item?.post_id}`);
          } else {
            navigate("/my-network");
          }
          setDoRefetchNotification((prev) => !prev);
        }
      } else if (item && item.is_read) {
        if (item.type === "comment") {
          navigate(`/profile/${ownData?._id}/activities/${item?.post_id}`);
        } else {
          navigate("/my-network");
        }
        setDoRefetchNotification((prev) => !prev);
      }

    } catch (error) {
      console.log("error:", error);
      toast.error("Failed to copy the link!");
    }
  };

  return (
    <div className="px-5 xl:px-50 mt-[54px] flex gap-5 w-full bg-gray-100 max-h-[calc(100%-126px)] min-h-[calc(100%-126px)] h-full">
      {/* Left Side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden h-[95%] my-3">
        <div className="h-fit">
          <ProfileCard data={ownData} />
        </div>
      </div>

      {/* Middle Side */}
      <div className="w-full my-3 sm:w-[50%] min-h-[95%] max-h-[95%] h-full overflow-y-auto">
        {/* Notifications List */}
        {notifications.length > 0 ? (
          <>
            <div className="min-h-[calc(100vh-205px)]">
              <Card padding={0}>
                <div className="w-full">
                  {/* For each notification */}
                  {notifications.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleOnClickNotification(item)}
                        className={`border-b cursor-pointer flex gap-4 items-center border-gray-300 p-3 ${item?.is_read ? "bg-gray-200" : "bg-blue-100"
                          }`}
                      >
                        <img
                          src={item?.sender?.profile_pic}
                          alt="profile photo"
                          className="rounded-full cursor-pointer w-15 h-15"
                        />
                        <div>{item?.content}</div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-start min-h-[calc(100vh-205px)]">
              <span className="mt-[50px] text-xl">Oops! No notification available.</span>
            </div>
          </>
        )}
      </div>

      {/* Right Side */}

      <div className="w-[26%] h-[95%] my-3 hidden bottom-0 md:block">
        <div className="sticky">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};
