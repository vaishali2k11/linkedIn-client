
import { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

export const AddModal = (props) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [desc, setDesc] = useState("");

    const cloudeName = 'dmlbcjkhc';
    const presetName = 'linkedInClone'


    const handlePostFn = async () => {
        if (desc.trim().length === 0 && !imageUrl) return toast.error("Please enter any field");
        try {
            const response = await axios.post('http://localhost:8080/api/post/create-post', {
                desc,
                image_link: imageUrl
            }, { withCredentials: true });

            if (response) {
                window.location.reload();
            }
        } catch (error) {
            console.log('error:', error)
            toast.error(error?.response?.data.error);
        }
    }

    const handleUploadImage = async (e) => {
        try {
            const files = e.target.files;
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'linkedInClone')
            const response = await axios.post('https://api.cloudinary.com/v1_1/dmlbcjkhc/image/upload', data);

            if (response) {
                const imageUrl = response.data.url;
                setImageUrl(imageUrl);
            }
        } catch (error) {
            console.log('error:', error);
        }
    }

    return (
        <div className="w-full">
            <div className="flex gap-4 items-center">
                <div className="relative">
                    <img src={props?.personalData?.profile_pic} alt="img" className="w-15 h-15 rounded-full" />
                </div>
                <div className="text-2xl">{props?.personalData?.f_name}</div>
            </div>


            <div className='w-full'>
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} cols={50} rows={5} placeholder="What do you want to talk about?" className="my-3 w-full rounded-md outline text-xl p-2" name="" id=""></textarea>
            </div>
            {imageUrl && (
                <>
                    <div>
                        <img src={imageUrl} alt="" className="w-20 h-20 rounded-2xl" />
                    </div>
                </>
            )}

            <div className="flex justify-between items-center">
                <div className="my-6">
                    <label className="cursor-pointer" htmlFor="inputFile"><ImageIcon /> </label>
                    <input onChange={handleUploadImage} type="file" className="hidden" id="inputFile" />
                </div>
                <div onClick={handlePostFn} className='bg-blue-950 text-white py-1 px-3 cursor-pointer rounded-2xl h-fit'>Post</div>
            </div>

            <ToastContainer />
        </div>
    )
}