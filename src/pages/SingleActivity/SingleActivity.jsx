import { Advertisement } from "../../components/Advertisement/Advertisement";
import { Card } from "../../components/Card/Card";
import { Post } from "../../components/Post/Post";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";

export const SingleActivity = () => {
  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left Side */}
      <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard />
        </div>
      </div>

      {/* Middle Side */}
      <div className="w-full py-5 sm:w-[50%]">
        <div>
          <Post />
        </div>
      </div>

      {/* Right Side */}

      <div className="w-[26%] py-5 hidden md:block">
        <div className="my-5 sticky top-19">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};
