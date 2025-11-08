import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
export const MyNetwork = () => {
  const [text, setText] = useState("Catch Up With Friends");
  const [friendData, setFriendData] = useState([]);
  const [pendingFriendData, setPendingFriendData] = useState([]);

  useEffect(() => {
    fetchFriendList();
    fetchPendingRequest();
  }, []);

  const handleFriends = async () => {
    setText("Catch Up With Friends");
  };

  const handlePending = () => {
    setText("Pending Request");
  };

  const fetchFriendList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/auth/get-all-friend`,
        { withCredentials: true }
      );

      if (response) {
        console.log('response:', response)
        setFriendData(response?.data?.friends);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  const fetchPendingRequest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/auth/get-pending-friend`,
        { withCredentials: true }
      );

      if (response) {
        setPendingFriendData(response?.data?.pendingFriends);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="px-5 xl:px-50 mt-[54px] flex flex-col gap-1 w-full bg-gray-100 max-h-[calc(100%-126px)] min-h-[calc(100%-126px)] h-full overflow-hidden">
      <div className="py-3 px-6 border border-gray-400 w-full flex justify-between my-3 text-xl bg-white rounded-xl">
        <div>{text}</div>
        <div className="flex gap-3">
          <button
            onClick={handleFriends}
            className={`p-1 px-2 cursor-pointer border rounded-lg border-gray-300 ${text === "Catch Up With Friends" ? "bg-blue-800 text-white" : ""
              }`}
          >
            Friends
          </button>
          <button
            onClick={handlePending}
            className={`p-1 px-2 cursor-pointer border rounded-lg border-gray-300 ${text === "Pending Request" ? "bg-blue-800 text-white" : ""
              }`}
          >
            Pending Request
          </button>
        </div>
      </div>

      <div className="flex min-h-[calc(100%-110px)] max-h-[calc(100%-110px)] h-full overflow-y-auto w-full gap-7 flex-wrap items-start justify-center">
        {text === "Catch Up With Friends" ? (
          <>
            {friendData?.map((friend, index) => {
              return (
                <>
                  <div className="md:w-[23%] h-[270px] sm:w-full">
                    <ProfileCard data={friend} />
                  </div>
                </>
              );
            })}
          </>
        ) : text === "Pending Request" ? (
          <>
            {pendingFriendData?.map((friend, index) => {
              return (
                <>
                  <div className="md:w-[23%] h-[270px] sm:w-full">
                    <ProfileCard data={friend} />
                  </div>
                </>
              );
            })}
          </>
        ) : null}

        {friendData.length === 0 && text === "Catch Up With Friends" ? (
          <div>No any Friends Yet</div>
        ) : pendingFriendData.length === 0 && text === "Pending Request" ? (
          <div>No any Pending Friends yet</div>
        )
          : null}
      </div>

      <ToastContainer />
    </div>
  );
};
