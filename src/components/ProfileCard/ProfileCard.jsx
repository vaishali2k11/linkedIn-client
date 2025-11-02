
import { Card } from "../Card/Card"
export const ProfileCard = (props) => {
console.log('props:', props)

    return (
        <Card padding={0}>
            <div className="relative h-25">
                <div className="relative h-22 w-full rounded-md">
                    <img src={props.data?.cover_pic} alt="" className="rounded-t-md h-full w-full" />
                </div>
                <div className="absolute top-14 left-6 z-10">
                    <img src={props?.data?.profile_pic} alt="Profile Logo" className="rounded-full border-2 h-16 w-16 border-white cursor-pointer" />
                </div>
            </div>

            <div className="p-5">
                <div className="text-xl">{props?.data?.f_name}</div>
                <div className="text-sm my-1">{props?.data?.headline}</div>
                <div className="text-sm my-1">{props?.data?.curr_location}</div>
                <div className="text-sm my-1">{props?.data?.curr_company}</div>
            </div>
        </Card>
    )
}