
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, CircularProgress } from '@mui/material';

export const ImageModal = ({ selfData, handleEditFn, isCircular }) => {
    const [imageLink, setImageLink] = useState(isCircular ? selfData?.profile_pic : selfData?.cover_pic);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputImage = async (e) => {
        setIsLoading(true);
        try {
            const files = e.target.files;
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'linkedInClone')
            const response = await axios.post('https://api.cloudinary.com/v1_1/dmlbcjkhc/image/upload', data);

            if (response) {
                const imageUrl = response.data.url;
                setImageLink(imageUrl);
            }
        } catch (error) {
            console.log('error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmitFn = async () => {
        try {
            let { data } = { ...selfData };
            if (isCircular) {
                data = { ...data, ['profile_pic']: imageLink }
            } else {
                data = { ...data, ['cover_pic']: imageLink }
            }
            handleEditFn(data);
        } catch (error) {
            console.log('error:', error)
        }
    }

    return (
        <div className="p-5 relative flex items-center flex-col h-full">
            {isCircular ? (
                <>
                    <img src={imageLink} alt="" className="rounded-full w-[150px] h-[150px]" />
                </>
            ) : (
                <>
                    <img src={imageLink} alt="" className="rounded-xl w-full h-[200px] object-cover" />
                </>
            )}

            <label htmlFor="btn-submit" className="absolute bottom-10 left-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer">Upload</label>
            <input onChange={handleInputImage} type="file" className="hidden" id="btn-submit" />

            {isLoading ? (
                <>
                    <Box sx={{ display: 'flex', marginTop: '10px' }}>
                        <CircularProgress />
                    </Box>
                </>
            ) : (
                <div onClick={handleSubmitFn} className="absolute bottom-10 right-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer">Submit</div>
            )}

        </div>
    )
}