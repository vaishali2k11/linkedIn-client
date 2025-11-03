import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { Advertisement } from "../../components/Advertisement/Advertisement";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { Card } from "../../components/Card/Card";
import { Post } from "../../components/Post/Post";

export const AllActivities = () => {
  const { id } = useParams();

  const [posts, setPosts] = useState([]);
  const [ownData, setOwnData] = useState(null);

  const handleToFetchDataOnLoad = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/auth/get-all-post-for-user/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response) {
        setPosts(response?.data?.posts);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    handleToFetchDataOnLoad();
    let userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);
  }, []);

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard data={posts[0]?.user} />
        </div>
      </div>

      {/* Middle Side */}
      <div className="w-full py-5 sm:w-[50%]">
        <div>
          <Card padding={1}>
            <div className="text-xl">All Activity</div>
            <div className="cursor-pointer w-fit p-2 border rounded-4xl bg-green-800 my-2 text-white font-semibold">
              Posts
            </div>

            <div className="my-2 flex flex-col gap-2">
              {posts?.map((item, index) => {
                return (
                  <>
                    <div key={index}>
                      <Post postData={item} personalData={ownData} />
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

      <ToastContainer />
    </div>
  );
};
