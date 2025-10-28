
import { Card } from "../Card/Card"
export const ProfileCard = () => {

    return (
        <Card padding={0}>
            <div className="relative h-25">
                <div className="relative h-22 w-full rounded-md">
                    <img src="https://thumbs.dreamstime.com/b/idyllic-summer-landscape-clear-mountain-lake-alps-45054687.jpg" alt="" className="rounded-t-md h-full w-full" />
                </div>
                <div className="absolute top-14 left-6 z-10">
                    <img src="https://avatar.iran.liara.run/public/boy?username=Ash" alt="Profile Logo" className="rounded-full border-2 h-16 w-16 border-white cursor-pointer" />
                </div>
            </div>

            <div className="p-5">
                <div className="text-xl">User 1</div>
                <div className="text-sm my-1">@Amazon Software Eng</div>
                <div className="text-sm my-1">Delhi, India</div>
                <div className="text-sm my-1">Amazonf</div>
            </div>
        </Card>
    )
}