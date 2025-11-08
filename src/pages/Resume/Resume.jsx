import { useState, useEffect } from "react";
import { Advertisement } from "../../components/Advertisement/Advertisement";
export const Resume = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let userData = localStorage.getItem("userInfo");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  return (
    <div className="px-5 xl:px-50 mt-[54px] flex gap-5 w-full bg-gray-100 min-h-[calc(100%-126px)] max-h-[calc(100%-126px)] h-full overflow-hidden">

      <div className="my-3 max-h-[95%] min-h-[95%] h-full overflow-y-auto w-full sm:w-[74%]">
        <div className="w-full">
          <img
            src={userData?.resume}
            alt="resume"
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>

      <div className="w-[26%] py-5 hidden md:block">
        <div className="sticky top-19">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};
