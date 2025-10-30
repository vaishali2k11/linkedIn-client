
import { Card } from "../Card/Card"
export const Advertisement = () => {

    return (
        <div className="sticky top-18">
            <Card padding={0}>
                <div className="relative h-25">
                    <div className="relative h-22 w-full rounded-md">
                        <img src="https://thumbs.dreamstime.com/b/idyllic-summer-landscape-clear-mountain-lake-alps-45054687.jpg" alt="" className="rounded-t-md h-full w-full" />
                    </div>
                    <div className="absolute top-14 left-[40%] z-10">
                        <img src="https://avatar.iran.liara.run/public/boy?username=Ash" alt="Profile Logo" className="rounded-full border-2 h-14 w-14 border-white cursor-pointer" />
                    </div>
                </div>

                <div className="px-5 my-5 mx-auto">
                    <div className="text-sm font-semibold text-center">User 1</div>
                    <div className="text-sm my-3 text-center">Get the latest jobs and industry news</div>
                    <div className="text-sm my-1 border text-center p-2 rounded-2xl font-bold border-blue-950 text-white bg-blue-800 cursor-pointer">Explore</div>
                </div>
            </Card>
        </div>
    )
}