import { useState, useEffect } from "react";
export const Conversation = ({ item, id, ownData, handleSelectedConv, activeConvId }) => {
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    let ownId = ownData?._id;
    let arr = item?.members?.filter((it) => it?._id !== ownId);
    setMemberData(arr[0]);
  }, []);

  const handleClickFn = async () => {
    handleSelectedConv(item?._id, memberData)
  }

  return (
    <div
      key={id}

      onClick={handleClickFn}
      className={`flex items-center w-full cursor-pointer border-b bordre-gray-300 gap-3 p-4 hover:bg-gray-200 ${activeConvId === item?._id ? 'bg-gray-100' : null}`}
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
