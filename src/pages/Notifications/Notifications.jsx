import { Advertisement } from "../../components/Advertisement/Advertisement";
import { ProfileCard } from "../../components/ProfileCard/ProfileCard";
import { Card } from "../../components/Card/Card";

export const Notifications = () => {
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
        {/* Notifications List */}
        <div>
          <Card padding={0}>
            <div className="w-full">
              {/* For each notification */}
              <div className="border-b cursor-pointer flex gap-4 items-center border-gray-300 p-3">
                <img
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                  alt=""
                  className="rounded-full cursor-pointer w-15 h-15"
                />
                <div>Dummy User has sent you friend request</div>
              </div>

              {/* For each notification */}
              <div className="border-b cursor-pointer flex gap-4 items-center border-gray-300 p-3">
                <img
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                  alt=""
                  className="rounded-full cursor-pointer w-15 h-15"
                />
                <div>Dummy User has commented on your post</div>
              </div>
            </div>
          </Card>
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
