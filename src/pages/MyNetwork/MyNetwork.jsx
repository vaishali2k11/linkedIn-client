import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
export const MyNetwork = () => {
  const [text, setText] = useState("Catch Up With Friends");
  const [friendData, setFriendData] = useState([]);

  useEffect(() => {
    if (text === "Catch up with Friends") {
      fetchFriendList();
    } else {
      fetchPendingRequest();
    }
  }, [text]);

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
        setFriendData(response?.data?.pendingFriends);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="px-5 xl:px-50 py-9 flex flex-col gap-5 w-full mt-5 bg-gray-100">
      <div className="py-4 px-10 border border-gray-400 w-full flex justify-between my-5 text-xl bg-white rounded-xl">
        <div>{text}</div>
        <div className="flex gap-3">
          <button
            onClick={handleFriends}
            className={`p-1 cursor-pointer border rounded-lg border-gray-300 ${
              text === "Catch Up With Friends" ? "bg-blue-800 text-white" : ""
            }`}
          >
            Friends
          </button>
          <button
            onClick={handlePending}
            className={`p-1 cursor-pointer border rounded-lg border-gray-300 ${
              text === "Pending Request" ? "bg-blue-800 text-white" : ""
            }`}
          >
            Pending Request
          </button>
        </div>
      </div>

      <div className="flex h-[80vh] w-full gap-7 flex-wrap items-start justify-center">
        {friendData?.map((friend, index) => {
          return (
            <>
              <div className="md:w-[23%] h-[270px] sm:w-full">
                <ProfileCard data={friend} />
              </div>
            </>
          );
        })}

        {friendData.length === 0 ? (
          text === "Catch Up With Friends" ? (
            <div>No any Friends Yet</div>
          ) : (
            <div>No any Pending Friends yet</div>
          )
        ) : null}
      </div>

      <ToastContainer />
    </div>
  );
};
