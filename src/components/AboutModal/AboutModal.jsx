
import { useState } from "react";
import axios from "axios";

export const AboutModal = ({ selfData, handleEditFn }) => {
    const [data, setData] = useState({
        about: selfData?.about,
        skills: selfData?.skills?.join(","),
        resume: selfData?.resume
    })
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (event, key) => {
        setData({ ...data, [key]: event.target.value })

    }

    const handleSaveBtn = async () => {
        let arr = data?.skills?.split(",");
        console.log('arr:', arr)
        let newData = {...selfData, about: data.about, skills: arr, resume: data.resume};
        handleEditFn(newData);
    }

    const handleInputImage = async (e) => {
        setIsLoading(true);
        try {
            const files = e.target.files;
            console.log('files:', files)
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'linkedInClone')
            const response = await axios.post('https://api.cloudinary.com/v1_1/dmlbcjkhc/image/upload', data);

            if (response) {
                const imageUrl = response.data.url;
                setData({...data, resume: imageUrl})
            }
        } catch (error) {
            console.log('error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="my-8">
            <div className="w-full mb-4">
                <label htmlFor="">About*</label>
                <br />
                <textarea value={data.about} onChange={(e) => handleOnChange(e, 'about')} className="p-2 mt-1 w-full border rounded-md" cols={10} rows={3} name="" id=""></textarea>
            </div>

            <div className="w-full mb-4">
                
                <label htmlFor="">Skills*(Add by seperating comma)</label>
                <br />
                <textarea value={data.skills} onChange={(e) => handleOnChange(e, 'skills')} className="p-2 mt-1 w-full border rounded-md" cols={10} rows={3} name="" id=""></textarea>
            </div>

            <div className="w-full mb-4">
                <label htmlFor="resumeUpload" className="p-2 bg-blue-800 text-white rounded-lg cursor-pointer">Resume Upload</label>
                <input onChange={(e) => handleInputImage(e)} type="file" className="hidden" id="resumeUpload" />
                {data.resume && <><div className="my-2">{data.resume}</div></>}
            </div>

            <div onClick={handleSaveBtn} className="bg-blue-500 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl">Save</div>
        </div>
    )
}