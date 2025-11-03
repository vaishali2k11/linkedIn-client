
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { Advertisement } from "../../components/Advertisement/Advertisement";
import { Card } from "../../components/Card/Card";
import { Post } from "../../components/Post/Post";
import { Modal } from "../../components/Modal/Modal";
import { ImageModal } from "../../components/ImageModal/ImageModal";
import { EditInfoModal } from "../../components/EditInfoModal/EditInfoModal";
import { AboutModal } from "../../components/AboutModal/AboutModal";
import { ExpModal } from "../../components/ExpModal/ExpModal";

import { MessageModal } from "../../components/MessageModal/MessageModal";

import EditIcon from "@mui/icons-material/Edit";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export const Profile = () => {
  const { id } = useParams();
  const [imageModal, setImageModal] = useState(false);
  const [circularImage, setCircularImage] = useState(true);
  const [infoModal, setInfoModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);
  const [expModal, setExpModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const [userData, setUserData] = useState(null);
  console.log('userData:', userData)
  const [postData, setPostData] = useState([]);
  const [ownData, setOwnData] = useState(null);

  const [updateExp, setUpdateExp] = useState({ clicked: "", id: "", dates: {}});

  useEffect(() => {
    fetchDataOnLoad();
  }, []);

  const updateExpEdit = (id, data) => {
    setUpdateExp({
      ...updateExp,
      clicked: true,
      id,
      data
    })
    setExpModal((prev) => !prev); 
  }

  const fetchDataOnLoad = async () => {
    try {
      const [userData, postData, ownData] = await Promise.all([
        axios.get(`http://localhost:8080/api/auth/user/${id}`, { withCredentials: true }),
        axios.get(`http://localhost:8080/api/post/get-top-5-post-for-user/${id}`, { withCredentials: true }),
        axios.get('http://localhost:8080/api/auth/self', { withCredentials: true })
      ])

      if (userData) {
        setUserData(userData?.data?.user);
      }
      if (postData) {
        setPostData(postData?.data?.top5Post);
      }
      if (ownData) {
        setOwnData(ownData?.data?.user)
      }
    } catch (error) {
      console.log('error:', error)
      toast.error('Something went wrong!')
    }
  }

  const handleInfoModal = () => {
    setInfoModal((prev) => !prev);
  };

  const handleAboutModal = () => {
    setAboutModal((prev) => !prev);
  };

  const handleExpModal = () => {
    if(expModal) {
      setUpdateExp({ clicked: "", id: "", dates: {} })
    }
    setExpModal((prev) => !prev);
  };

  const handleMessageModal = () => {
    setMessageModal((prev) => !prev);
  };

  const handleImageModalOpenClose = () => {
    setImageModal((prev) => !prev);
  };

  const handleOnEditCover = () => {
    setImageModal(true);
    setCircularImage(false);
  };

  const handleCircularImageModalOpen = () => {
    setImageModal(true);
    setCircularImage(true);
  };

  const handleEditFn = async (data) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/auth/update-user`, { user: data }, { withCredentials: true });

      if(response) {
        window.location.reload();
      }
    } catch (error) {
      console.log('error:', error)
      toast.error(error?.response?.data?.error);
    }
  }

  return (
    <div className="px-5 xl:px-50 py-9 flex flex-col gap-5 w-full mt-5 bg-gray-100">
      <div className="flex justify-between">
        {/* Left Side Main Section */}
        <div className="w-full md:w-[70%]">
          <div>
            <Card padding={0}>
              <div className="w-full h-fit">
                <div className="relative w-full h-[200px]">
                  <div
                    onClick={handleOnEditCover}
                    className="absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white"
                  >
                    <EditIcon />
                  </div>
                  <img
                    src={userData?.cover_pic}
                    alt=""
                    className="w-full h-[200px] rounded-tr-lg rounded-tl-lg"
                  />
                  <div
                    onClick={handleCircularImageModalOpen}
                    className="absolute object-cover top-24 left-6 z-10"
                  >
                    <img
                      src={userData?.profile_pic}
                      alt=""
                      className="rounded-full border-2 border-white cursor-pointer w-35 h-35"
                    />
                  </div>
                </div>

                <div className="mt-10 relative px-8 py-2">
                  <div
                    onClick={handleInfoModal}
                    className="absolute cursor-pointer top-0 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white"
                  >
                    <EditIcon />
                  </div>
                  <div className="w-full">
                    <div className="text-2xl">{userData?.f_name}</div>
                    <div className="text-gray-700">
                      {userData?.headline}
                    </div>
                    <div className="text-sm text-gray-500">{userData?.curr_location}</div>
                    <div className="text-md text-blue-800 w-fit cursor-pointer hover:underline">
                      {userData?.friends?.length} Connections
                    </div>

                    <div className="md:flex w-full justify-between">
                      <div className="my-5 flex gap-5">
                        <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold">
                          Open to
                        </div>
                        <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold">
                          Share Profile
                        </div>
                        <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold">
                          LogOut
                        </div>
                      </div>

                      <div className="my-5 flex gap-5">
                        <div
                          onClick={handleMessageModal}
                          className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold"
                        >
                          Message
                        </div>
                        <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold">
                          Disconnect
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">About</div>
                <div onClick={handleAboutModal} className="cursor-pointer">
                  <EditIcon />
                </div>
              </div>
              <div className="text-gray-700 text-md w-[80%]">
                {userData?.about}
              </div>
            </Card>
          </div>

          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Skills</div>
              </div>
              <div className="text-gray-700 text-md my-2 w-full flex gap-4 flex-wrap">
                {userData?.skills?.map((skill, index) => {
                  return (
                    <>
                      <div key={index} className="py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg">
                        {skill}
                      </div>
                    </>
                  )
                })}
              </div>
            </Card>
          </div>

          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Activities</div>
              </div>

              <div className="cursor-pointer px-3 py-1 w-fit border rounded-4xl bg-green-800 text-white font-semibold">
                Post
              </div>

              {/* Parent Div for scrollable activities */}
              <div className="overflow-x-auto my-2 flex gap-1 overflow-y-hidden w-full">
                {postData?.map((post, index) => {
                  return (
                    <>
                      <Link
                        to={`/profile/${id}/activities/${post?._id}`}
                        className="cursor-pointer shrink-0 w-[350px] h-[560px]"
                      >
                        <Post profile={1} postData={post} personalData={ownData} />
                      </Link>
                    </>
                  )
                })}
              </div>

              <div className="w-full flex justify-center items-center">
                <Link
                  to={`/profile/${id}/activities`}
                  className="p-2 rounded-xl cursor-pointer hover:bg-gray-300"
                >
                  Show All Post <ArrowRightAltIcon />
                </Link>
              </div>
            </Card>
          </div>

          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Experience</div>
                <div onClick={handleExpModal} className="cursor-pointer">
                  <AddIcon />
                </div>
              </div>

              <div className="mt-5">
                {userData && userData.experience && userData.experience.map((experience, index) => {
                  return (
                    <>
                      <div className="p-2 border-t border-gray-300 flex justify-between">
                        <div>
                          <div className="text-lg">
                            {experience.designation}
                          </div>

                          <div className="text-sm">{experience.company_name}</div>
                          <div className="text-sm text-gray-500">
                            {experience.duration}
                          </div>
                          <div className="text-sm text-gray-500">{experience.location}</div>
                        </div>

                        <div onClick={() => updateExpEdit(experience?._id, experience)} className="cursor-pointer">
                          <EditIcon />
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>

        <div className="hidden md:flex md:w-[28%]">
          <div className="sticky top-19">
            <Advertisement />
          </div>
        </div>
      </div>

      {imageModal && (
        <>
          <Modal title="Upload Image" onClose={handleImageModalOpenClose}>
            <ImageModal selfData={ownData} handleEditFn={handleEditFn} isCircular={circularImage} />
          </Modal>
        </>
      )}

      {infoModal && (
        <>
          <Modal title="Edit Info" onClose={handleInfoModal}>
            <EditInfoModal selfData={ownData} handleEditFn={handleEditFn} />
          </Modal>
        </>
      )}

      {aboutModal && (
        <>
          <Modal title="About" onClose={handleAboutModal}>
            <AboutModal selfData={ownData} handleEditFn={handleEditFn} />
          </Modal>
        </>
      )}

      {expModal && (
        <>
          <Modal title="Experience" onClose={handleExpModal}>
            <ExpModal selfData={ownData} handleEditFn={handleEditFn} updateExp={updateExp} setUpdateExp={setUpdateExp} />
          </Modal>
        </>
      )}

      {messageModal && (
        <>
          <Modal title="Message" onClose={handleMessageModal}>
            <MessageModal />
          </Modal>
        </>
      )}

      <ToastContainer />
    </div>
  );
};
