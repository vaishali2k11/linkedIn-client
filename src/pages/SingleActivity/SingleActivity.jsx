import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Advertisement } from "../../components/Advertisement/Advertisement";
import { Card } from "../../components/Card/Card";
import { Post } from "../../components/Post/Post";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";

export const SingleActivity = () => {
  const { id, postId } = useParams();
  const [ownData, setOwnData] = useState(null);
  const [postData, setPostData] = useState(null);

  const toFetchDataOnLoad = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/post/get-post-by-id/${postId}`,
        {
          withCredentials: true,
        }
      );

      if (response && response.data && response.data.posts) {
        setPostData(response?.data?.posts);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);
    toFetchDataOnLoad();
  }, []);
  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard data={postData?.user} />
        </div>
      </div>

      {/* Middle Side */}
      <div className="w-full py-5 sm:w-[50%]">
        <div>
          <Post personalData={ownData} postData={postData} />
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
