import { useState, useEffect } from "react";
import { Card } from "../../components/Card/Card";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ArticleIcon from "@mui/icons-material/Article";
import { Advertisement } from "../../components/Advertisement/Advertisement";
import { Post } from "../../components/Post/Post";
import { Modal } from "../../components/Modal/Modal";
import { AddModal } from "../../components/AddModal/AddModal";
import { Loader } from "../../components/Loader/Loader";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

export const Feeds = () => {
  const [addPostModal, setAddPostModal] = useState(false);
  const [personalData, setPersonalData] = useState(null);
  const [postData, setPostData] = useState([])

  // const fetchSelfData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/auth/self', { withCredentials: true });

  //     if (response) {
  //       setPersonalData(response.data.user);
  //     }
  //   } catch (error) {
  //     console.log('error:', error);
  //     toast.error(error?.response?.data?.error);
  //   }
  // }

  const fetchedSelfPostDataFn = async () => {
    try {
      const [userData, postData] = await Promise.all([
        await axios.get('http://localhost:8080/api/auth/self', { withCredentials: true }),
        await axios.get('http://localhost:8080/api/post/get-all-post', { withCredentials: true })
      ])

      if(userData) {
        setPersonalData(userData.data.user);
        localStorage.setItem('userInfo', JSON.stringify(userData.data.user));
      }

      if(postData) {
        setPostData(postData.data.posts);
      }

    } catch (error) {
      console.log('error:', error);
      toast.error(error?.response?.data?.error);
    }
  }



  useEffect(() => {
    // fetchSelfData();
    fetchedSelfPostDataFn();
  }, [])

  const handleOpenPostModal = () => {
    setAddPostModal((prev) => !prev);
  };

  return (
    <div className="px-5 xl:px-50 mt-[54px] flex gap-5 w-full bg-gray-100 min-h-[calc(100%-126px)] max-h-[calc(100%-126px)] h-full overflow-hidden">
      {/* Left Side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard data={personalData} />
        </div>
        <div className="w-full my-5">
          <Card padding={1}>
            <div className="w-full flex justify-between">
              <div>Profile Viewers</div>
              <div className="text-blue-900">23</div>
            </div>
            <div className="w-full flex justify-between">
              <div>Post Impressions</div>
              <div className="text-blue-900">90</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Middle Side */}
      <div className="w-full mb-2.5 mt-5 max-h-full overflow-y-auto sm:w-[50%]">
        {/* Post Section */}
        <div>
          <Card padding={1}>
            <div className="flex gap-2 items-center">
              <img
                src={personalData?.profile_pic}
                alt="Profile Logo"
                className="rounded-full w-[52px] h-[52px] border-2 border-white cursor-pointer"
              />
              <div
                onClick={() => setAddPostModal(true)}
                className="w-full border py-3 px-3 rounded-3xl cursor-pointer hover:bg-gray-100"
              >
                Start a post
              </div>
            </div>

            <div className="w-full flex mt-3">
              <div
                onClick={() => setAddPostModal(true)}
                className="flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100"
              >
                <VideoCallIcon sx={{ color: "green" }} />
                Video
              </div>
              <div
                onClick={() => setAddPostModal(true)}
                className="flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100"
              >
                <InsertPhotoIcon sx={{ color: "blue" }} />
                Photo
              </div>
              <div
                onClick={() => setAddPostModal(true)}
                className="flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100"
              >
                <ArticleIcon sx={{ color: "orange" }} />
                Article
              </div>
            </div>
          </Card>
        </div>

        <div className="border-b border-gray-400 w-full my-5" />

        <div className="w-full flex flex-col gap-5">
          {postData.map((post, index) => {
            return (
              <Post postData={post} key={index} personalData={personalData} />
            )
          })}
        </div>
      </div>

      {/* Right Side */}

      <div className="w-[26%] py-5 hidden md:block">
        <div>
          <Card padding={1}>
            <div className="text-xl">LinkedIn News</div>
            <div className="text-gray-600">Top stories</div>
            <div className="my-1">
              <div className="text-md">Buffett to remain Berkshire chair</div>
              <div className="text-xs text-gray-400">2h ago</div>
            </div>
            <div className="my-1">
              <div className="text-md">Foreign investments surge again</div>
              <div className="text-xs text-gray-400">3h ago</div>
            </div>
          </Card>
        </div>

        <div className="my-5 sticky top-19">
          <Advertisement />
        </div>
      </div>

      {addPostModal && (
        <>
          <Modal title={""} onClose={handleOpenPostModal}>
            <AddModal personalData={personalData} />
          </Modal>
        </>
      )}

      <ToastContainer />
    </div>
  );
};
