
import { Card } from "../../components/Card/Card"
import { ProfileCard } from "../../components/ProfileCard/ProfileCard"
export const Feeds = () => {
    return (
        <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
            {/* Left Side */}
            <div className="w-[21%] sm:block sm:w-[23%] hidden py-5">
                <div className="h-fit">
                    <ProfileCard />
                </div>
                <div className="w-full my-5">

                    <Card padding={1}>
                        <div className="w-full flex justify-between">
                            <div>Profile Viewers</div>
                            <div className="text-blue-900">23</div>
                        </div>
                        <div className="w-full flex justify-between">
                            <div>Post Impressions</div>
                            <div className="text-blue-900">90</div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Middle Side */}
            <div className="w-full py-5 sm:w-[50%]">
                <div>
                    <Card padding={1}>
                        <div className="flex gap-2 items-center">
                            <img src="https://avatar.iran.liara.run/public/boy?username=Ash" alt="Profile Logo" className="rounded-full w-[52px] h-[52px] border-2 border-white cursor-pointer" />
                        </div>
                    </Card>
                </div>
            </div>

            {/* Right Side */}

            <div></div>
        </div>
    )
}