import { useState } from "react";
import axios from "axios";

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
          onChange={(e) => setMessage(e.target.message)}
          className="p-2 mt-1 w-full border rounded-md"
          placeholder="Enter Message"
          cols={10}
          rows={5}
          name=""
          id=""
        ></textarea>
      </div>

      <div
        onClick={handleSendMessage}
        className="bg-blue-500 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl"
      >
        Send
      </div>
    </div>
  );
};
