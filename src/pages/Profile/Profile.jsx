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
  const [postData, setPostData] = useState([]);
  const [ownData, setOwnData] = useState(null);

  const [updateExp, setUpdateExp] = useState({
    clicked: "",
    id: "",
    dates: {},
  });

  useEffect(() => {
    fetchDataOnLoad();
  }, [id]);

  const updateExpEdit = (id, data) => {
    setUpdateExp({
      ...updateExp,
      clicked: true,
      id,
      data,
    });
    setExpModal((prev) => !prev);
  };

  const fetchDataOnLoad = async () => {
    try {
      const [userData, postData, ownData] = await Promise.all([
        axios.get(`http://localhost:8080/api/auth/user/${id}`, {
          withCredentials: true,
        }),
        axios.get(
          `http://localhost:8080/api/post/get-top-5-post-for-user/${id}`,
          { withCredentials: true }
        ),
        axios.get("http://localhost:8080/api/auth/self", {
          withCredentials: true,
        }),
      ]);

      if (userData) {
        setUserData(userData?.data?.user);
      }
      if (postData) {
        setPostData(postData?.data?.top5Post);
      }
      if (ownData) {
        setOwnData(ownData?.data?.user);
      }

      localStorage.setItem("userInfo", JSON.stringify(ownData?.data?.user));
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleInfoModal = () => {
    setInfoModal((prev) => !prev);
  };

  const handleAboutModal = () => {
    setAboutModal((prev) => !prev);
  };

  const handleExpModal = () => {
    if (expModal) {
      setUpdateExp({ clicked: "", id: "", dates: {} });
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
      const response = await axios.put(
        `http://localhost:8080/api/auth/update-user`,
        { user: data },
        { withCredentials: true }
      );

      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  const handleToCheckAmIFriend = () => {
    let arr = userData?.friends?.filter((item) => {
      return item === ownData?._id;
    });
    return arr?.length;
  };

  const handleToCheckIsInPendingList = () => {
    let arr = userData?.pending_friends?.filter((item) => {
      return item === ownData?._id;
    });
    return arr?.length;
  };

  const handleToCheckIsInSelfPendingList = () => {
    let arr = ownData?.pending_friends?.filter((item) => {
      return item === userData?._id;
    });
    return arr?.length;
  };

  const handleToCheckFriendStatus = () => {
    if (handleToCheckAmIFriend()) {
      return "Disconnet";
    } else if (handleToCheckIsInSelfPendingList()) {
      return "Approve Request";
    } else if (handleToCheckIsInPendingList()) {
      return "Request Sent";
    } else {
      return "Connect";
    }
  };

  const handleSendFriendRequest = async () => {
    try {
      if (handleToCheckFriendStatus() === "Request Sent") return;

      if (handleToCheckFriendStatus() === "Connect") {
        const response = await axios.post(
          `http://localhost:8080/api/auth/send-friend-request`,
          {
            reciever: userData?._id,
          },
          { withCredentials: true }
        );

        if (response) {
          toast.success(response?.data?.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } else if (handleToCheckFriendStatus() === "Approve Request") {
        const response = await axios.post(
          `http://localhost:8080/api/auth/accept-friend-request`,
          {
            friendId: userData?._id,
          },
          { withCredentials: true }
        );

        if (response) {
          toast.success(response?.data?.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } else {
        const response = await axios.delete(
          `http://localhost:8080/api/auth/remove-friend/${userData?._id}`,
          { withCredentials: true }
        );

        if (response) {
          toast.success(response?.data?.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response) {
        localStorage.clear();
        window.location.reload();
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      let string = `http://localhost:5173/profile/${id}`;
      await navigator.clipboard.writeText(string);
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.log("error:", error);
      toast.error("Failed to copy the link!");
    }
  };

  return (
    <div className="px-5 xl:px-50 mt-[54px] flex flex-col gap-5 w-full bg-gray-100 min-h-[calc(100%-126px)] max-h-[calc(100%-126px)] h-full overflow-hidden">
      <div className="flex h-full justify-between">
        {/* Left Side Main Section */}
        <div className="w-full md:w-[70%] h-[95%] max-h-[95%] overflow-y-auto my-3">
          <div className="">
            <Card padding={0}>
              <div className="w-full h-fit">
                <div className="relative w-full h-[200px]">
                  {userData?._id === ownData?._id && (
                    <>
                      <div
                        onClick={handleOnEditCover}
                        className="absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white"
                      >
                        <EditIcon />
                      </div>
                    </>
                  )}
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
                  {userData?._id === ownData?._id && (
                    <>
                      <div
                        onClick={handleInfoModal}
                        className="absolute cursor-pointer top-0 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white"
                      >
                        <EditIcon />
                      </div>
                    </>
                  )}
                  <div className="w-full">
                    <div className="text-2xl">{userData?.f_name}</div>
                    <div className="text-gray-700">{userData?.headline}</div>
                    <div className="text-sm text-gray-500">
                      {userData?.curr_location}
                    </div>
                    <div className="text-md text-blue-800 w-fit cursor-pointer hover:underline">
                      {userData?.friends?.length} Connections
                    </div>

                    <div className="md:flex w-full justify-between">
                      <div className="my-5 flex gap-5">
                        <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold">
                          Open to
                        </div>
                        <div
                          onClick={handleCopyToClipboard}
                          className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold"
                        >
                          Share Profile
                        </div>
                        {userData?._id === ownData?._id && (
                          <>
                            <div
                              onClick={handleLogOut}
                              className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold"
                            >
                              LogOut
                            </div>
                          </>
                        )}
                      </div>

                      <div className="my-5 flex gap-5">
                        {handleToCheckAmIFriend() ? (
                          <>
                            <div
                              onClick={handleMessageModal}
                              className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold"
                            >
                              Message
                            </div>
                          </>
                        ) : null}

                        {userData?._id === ownData?._id ? null : (
                          <>
                            <div
                              onClick={handleSendFriendRequest}
                              className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold"
                            >
                              {handleToCheckFriendStatus()}
                            </div>
                          </>
                        )}
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
                {userData?._id === ownData?._id && (
                  <>
                    <div onClick={handleAboutModal} className="cursor-pointer">
                      <EditIcon />
                    </div>
                  </>
                )}
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
                      <div
                        key={index}
                        className="py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg"
                      >
                        {skill}
                      </div>
                    </>
                  );
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
                        <Post
                          profile={1}
                          postData={post}
                          personalData={ownData}
                        />
                      </Link>
                    </>
                  );
                })}
              </div>

              {postData?.length > 5 && (
                <>
                  <div className="w-full flex justify-center items-center">
                    <Link
                      to={`/profile/${id}/activities`}
                      className="p-2 rounded-xl cursor-pointer hover:bg-gray-300"
                    >
                      Show All Post <ArrowRightAltIcon />
                    </Link>
                  </div>
                </>
              )}
            </Card>
          </div>

          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Experience</div>
                {userData?._id === ownData?._id && (
                  <>
                    <div onClick={handleExpModal} className="cursor-pointer">
                      <AddIcon />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-5">
                {userData &&
                  userData.experience &&
                  userData.experience.map((experience, index) => {
                    return (
                      <>
                        <div className="p-2 border-t border-gray-300 flex justify-between">
                          <div>
                            <div className="text-lg">
                              {experience.designation}
                            </div>

                            <div className="text-sm">
                              {experience.company_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {experience.duration}
                            </div>
                            <div className="text-sm text-gray-500">
                              {experience.location}
                            </div>
                          </div>

                          {userData?._id === ownData?._id && (
                            <>
                              <div
                                onClick={() =>
                                  updateExpEdit(experience?._id, experience)
                                }
                                className="cursor-pointer"
                              >
                                <EditIcon />
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    );
                  })}
              </div>
            </Card>
          </div>
        </div>

        <div className="hidden md:flex md:w-[28%] h-[90%] mt-3">
          <div className="sticky w-full">
            <Advertisement />
          </div>
        </div>
      </div>

      {imageModal && (
        <>
          <Modal title="Upload Image" onClose={handleImageModalOpenClose}>
            <ImageModal
              selfData={ownData}
              handleEditFn={handleEditFn}
              isCircular={circularImage}
            />
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
            <ExpModal
              selfData={ownData}
              handleEditFn={handleEditFn}
              updateExp={updateExp}
              setUpdateExp={setUpdateExp}
            />
          </Modal>
        </>
      )}

      {messageModal && (
        <>
          <Modal title="Message" onClose={handleMessageModal}>
            <MessageModal selfData={ownData} userData={userData} />
          </Modal>
        </>
      )}

      <ToastContainer />
    </div>
  );
};
