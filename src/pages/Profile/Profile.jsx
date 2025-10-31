import { useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  const [imageModal, setImageModal] = useState(false);
  const [circularImage, setCircularImage] = useState(true);
  const [infoModal, setInfoModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);
  const [expModal, setExpModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const { id } = useParams();

  const handleInfoModal = () => {
    setInfoModal((prev) => !prev);
  };

  const handleAboutModal = () => {
    setAboutModal((prev) => !prev);
  };

  const handleExpModal = () => {
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
                    src="https://thumbs.dreamstime.com/b/landscape-sunset-view-morain-lake-mountain-range-alberta-canada-44613434.jpg"
                    alt=""
                    className="w-full h-[200px] rounded-tr-lg rounded-tl-lg"
                  />
                  <div
                    onClick={handleCircularImageModalOpen}
                    className="absolute object-cover top-24 left-6 z-10"
                  >
                    <img
                      src="https://avatar.iran.liara.run/public/boy?username=Ash"
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
                    <div className="text-2xl">User 1</div>
                    <div className="text-gray-700">
                      I am a software engineer
                    </div>
                    <div className="text-sm text-gray-500">Delhi, India</div>
                    <div className="text-md text-blue-800 w-fit cursor-pointer hover:underline">
                      2 Connections
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus beatae commodi odio impedit cupiditate? Repellat,
                laborum quia eos non inventore at numquam enim nulla dolor,
                incidunt aliquam sed reiciendis soluta.
              </div>
            </Card>
          </div>

          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Skills</div>
              </div>
              <div className="text-gray-700 text-md my-2 w-full flex gap-4 flex-wrap">
                <div className="py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg">
                  React.JS
                </div>
                <div className="py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg">
                  JavaScript
                </div>
                <div className="py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg">
                  Node.js
                </div>
                <div className="py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg">
                  MongoDB
                </div>
                <div className="py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg">
                  Express.js
                </div>
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
                <Link
                  to={`/profile/${id}/activities/:123451`}
                  className="cursor-pointer shrink-0 w-[350px] h-[560px]"
                >
                  <Post profile={1} />
                </Link>
                <Link
                  to={`/profile/${id}/activities/:123452`}
                  className="cursor-pointer shrink-0 w-[350px] h-[560px]"
                >
                  <Post profile={1} />
                </Link>
                <Link
                  to={`/profile/${id}/activities/:123453`}
                  className="cursor-pointer shrink-0 w-[350px] h-[560px]"
                >
                  <Post profile={1} />
                </Link>
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
                <div className="p-2 border-t border-gray-300 flex justify-between">
                  <div>
                    <div className="text-lg">
                      DSE Engineer | Full Stack Engineer
                    </div>

                    <div className="text-sm">Amazon</div>
                    <div className="text-sm text-gray-500">
                      March 2022, Present
                    </div>
                    <div className="text-sm text-gray-500">Delhi, India</div>
                  </div>

                  <div className="cursor-pointer">
                    <EditIcon />
                  </div>
                </div>
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
            <ImageModal isCircular={circularImage} />
          </Modal>
        </>
      )}

      {infoModal && (
        <>
          <Modal title="Edit Info" onClose={handleInfoModal}>
            <EditInfoModal />
          </Modal>
        </>
      )}

      {aboutModal && (
        <>
          <Modal title="About" onClose={handleAboutModal}>
            <AboutModal />
          </Modal>
        </>
      )}

      {expModal && (
        <>
          <Modal title="Experience" onClose={handleExpModal}>
            <ExpModal />
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
    </div>
  );
};
