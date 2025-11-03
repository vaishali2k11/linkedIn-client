import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import ImageIcon from "@mui/icons-material/Image";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Card } from "../../components/Card/Card";
import { Conversation } from "../../components/Conversation/Conversation";
import { Advertisement } from "../../components/Advertisement/Advertisement";

export const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [ownData, setOwnData] = useState(null);
  const [activeConvId, setActiveConvId] = useState(null);
  const [selectedConvDetails, setSelectedConvDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [imageLink, setImageLink] = useState(null);
  const [messageText, setMessageText] = useState("")

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setOwnData(userData ? JSON.parse(userData) : null);
    handleToFetchConversationsOnLoad();
  }, []);

  useEffect(() => {
    if (activeConvId) {
      handleToFetchMessages();
    }
  }, [activeConvId]);

  const handleToFetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/message/get-conv-messages/${activeConvId}`, { withCredentials: axios });
      console.log('response:', response)

      if (response) {
        setMessages(response?.data?.message)
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.error);
    }
  }

  const handleSelectedConv = (id, userData) => {
    setActiveConvId(id);
    setSelectedConvDetails(userData);
  }

  const handleToFetchConversationsOnLoad = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/conversation/get-conversation`,
        { withCredentials: true }
      );

      if (response) {
        setConversations(response?.data?.conversations);
        setSelectedConvDetails(response?.data?.conversations[0]?._id);
        let ownId = ownData?._id;
        let arr = response.data?.conversations[0]?.members?.filter((it) => it._id !== ownId);
        setSelectedConvDetails(arr[0]);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  const handleInputImage = async (e) => {
    setIsLoading(true);
    try {
      const files = e.target.files;
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'linkedInClone')
      const response = await axios.post('https://api.cloudinary.com/v1_1/dmlbcjkhc/image/upload', data);

      if (response) {
        const imageUrl = response.data.url;
        setImageLink(imageUrl);
      }
    } catch (error) {
      console.log('error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/message/send-message`, {
        conversation: activeConvId,
        message: messageText,
        picture: imageLink
      }, { withCredentials: true });

      if(response) {
        
      }

    } catch(error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.error);
    }
  }

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      <div className="w-full justify-between flex pt-5">
        {/* Left Side */}
        <div className="w-full md:w-[70%]">
          <Card padding={0}>
            <div className="border-b border-gray-300 px-5 py-2 font-semibold text-lg">
              Messaging
            </div>

            <div className="border-b border-gray-300 px-5 py-2">
              <div className="py-1 px-3 cursor-pointer hover:bg-green-900 bg-green-800 font-semibold flex gap-2 w-fit rounded-2xl text-white">
                Focused <ArrowDropDownIcon />
              </div>
            </div>

            {/* Div for chat */}

            <div className="w-full md:flex">
              <div className="h-[590px] overflow-auto w-full md:w-[40%] border-r border-gray-400">
                {/* For each chat conversation */}
                {conversations?.map((item, index) => {
                  return (
                    <>
                      <Conversation activeConvId={activeConvId} handleSelectedConv={handleSelectedConv} item={item} id={index} ownData={ownData} />
                    </>
                  );
                })}
              </div>

              <div className="w-full md:w-[60%] border-gray-400">
                <div className="broder-gray-300 py-2 px-4 border-b flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold">{selectedConvDetails?.f_name}</p>
                    <p className="text-sm text-gray-400">{selectedConvDetails?.headline}</p>
                  </div>
                  <div>
                    <MoreHorizIcon />
                  </div>
                </div>

                <div className="h-[360px] w-full overflow-auto border-b border-gray-300">
                  <div className="w-full border-b border-gray-300 gap-3 p-4">
                    <img
                      src={selectedConvDetails?.profile_pic}
                      alt="Profile Logo"
                      className="rounded-full cursor-pointer w-16 h-16"
                    />

                    <div className="my-2">
                      <div className="text-md">{selectedConvDetails?.f_name}</div>
                      <div className="text-sm text-gray-500">
                        {selectedConvDetails?.headline}
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    {/* For each messages */}
                    {messages?.map((item, index) => {
                      return (
                        <>
                          <div key={index} className="flex w-full cursor-pointer border-gray-300 gap-3 p-4">
                            <div className="shrink-0">
                              <img
                                src={item?.sender?.profile_pic}
                                alt=""
                                className="w-8 h-8 rounded-full cursor-pointer"
                              />
                            </div>

                            <div className="mb-2 w-full">
                              <div className="text-md">{item?.sender?.f_name}</div>

                              <div className="text-sm mt-6 hover:bg-gray-200">
                                {item?.message}
                              </div>
                              {item?.picture && (
                                <>
                                  <div className="my-2">
                                    <img
                                      src={item?.picture}
                                      alt=""
                                      className="w-60 h-[180px] rounded-md"
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>
                </div>

                {/* Space for typing messages  */}
                <div className="p-2 w-full border-b border-gray-200">
                  <textarea
                    rows={4}
                    className="bg-gray-200 outline-0 rounded-xl text-sm w-full p-3"
                    placeholder="Write a message"
                    name=""
                    id=""
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  ></textarea>
                </div>

                <div className="p-3 flex justify-between">
                  <div>
                    <label htmlFor="messageImage" className="cursor-pointer">
                      <ImageIcon />
                    </label>
                    <input onChange={handleInputImage} type="file" id="messageImage" className="hidden" />
                  </div>

                  {!isloading && (
                    <div onClick={handleSendMessage} className="px-3 py-1 cursor-pointer rounded-2xl border bg-blue-950 text-white">
                      Send
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex md:w-[25%]">
          <div className="sticky top-19">
            <Advertisement />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};
