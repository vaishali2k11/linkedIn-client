
import ImageIcon from '@mui/icons-material/Image';
export const AddModal = () => {

    return (
        <div className="">
            <div className="flex gap-4 items-center">
                <div className="relative">
                    <img src="https://avatar.iran.liara.run/public/boy?username=Ash" alt="img" className="w-15 h-15 rounded-full" />
                </div>
                <div className="text-2xl">User 1</div>
            </div>


            <div>
                <textarea cols={50} rows={5} placeholder="What do you want to talk about?" className="my-3 outline-0 text-xl p-2" name="" id=""></textarea>
            </div>
            <div>
                <img src="https://media.istockphoto.com/id/1381637603/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=w64j3fW8C96CfYo3kbi386rs_sHH_6BGe8lAAAFS-y4=" alt="" className="w-20 h-20 rounded-2xl" />
            </div>

            <div className="flex justify-between items-center">
                <div className="my-6">
                    <label className="cursor-pointer" htmlFor="inputFile"><ImageIcon /> </label>
                    <input type="file" className="hidden" id="inputFile" />
                </div>
                <div className='bg-blue-950 text-white py-1 px-3 cursor-pointer rounded-2xl h-fit'>Post</div>
            </div>
        </div>
    )
}