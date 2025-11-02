
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
export const Modal = (props) => {

    return (
        <div className="bg-black/50 fixed top-0 left-0 inset-0 z-20 flex flex-col justify-center items-center">
            <div className="w-[95%] md:w-[50%] h-[500px] bg-white rounded-xl p-6">
                <div className="flex justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="text-2xl">{props.title}</div>
                    </div>
                    <div onClick={() => props.onClose()} className="cursor-pointer"><ClearOutlinedIcon /></div>
                </div>
                {props.children}
            </div>

        </div>
    )
}