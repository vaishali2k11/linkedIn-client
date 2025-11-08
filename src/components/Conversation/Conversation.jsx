import { useState, useEffect } from "react";
export const Conversation = ({ item, ownData, handleSelectedConv, activeConvId }) => {
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    let ownId = ownData?._id;
    let arr = item?.members?.filter((it) => it?._id !== ownId);
    setMemberData(arr[0]);
  }, []);

  const handleClickFn = () => {
    handleSelectedConv(item?._id, memberData)
  }

  return (
    <div
      onClick={handleClickFn}
      className={`flex items-center w-full cursor-pointer bordre-gray-300 gap-3 p-4 hover:bg-gray-300 ${activeConvId === item?._id ? 'bg-gray-200' : null}`}
    >
      <div className="shrink-0">
        <img
          src={memberData?.profile_pic}
          alt="dummy"
          className="w-12 h-12 rounded-full cursor-pointer"
        />
      </div>
      <div className="">
        <div className="text-md">{memberData?.f_name}</div>
        <div className="text-sm text-gray-500">{memberData?.headline}</div>
      </div>
    </div>
  );
};
