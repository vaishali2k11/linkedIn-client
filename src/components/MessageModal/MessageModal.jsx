import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const MessageModal = ({ selfData, userData }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/conversation/create-conversation`,
        {
          recieverId: userData?._id,
          message,
        },
        { withCredentials: true }
      );

      if (response) {
        setMessage("");
        window.location.reload();
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Failed to copy the link!");
    }
  };

  return (
    <div className="my-5">
      <div className="w-full mb-4">
        <label htmlFor="">Message*</label>
        <br />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 mt-1 w-full border rounded-md"
          placeholder="Enter Message"
          cols={10}
          rows={5}
          name=""
          id=""
        ></textarea>
      </div>

      <button
        onClick={() => {
          handleSendMessage();
        }}
        disabled={!message}
        className="bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl"
      >
        Send
      </button>

      <ToastContainer />
    </div>
  );
};
