
import { useState } from "react";

export const ExpModal = ({ selfData, handleEditFn, updateExp, setUpdateExp }) => {
    const [data, setData] = useState({
        designation: updateExp?.clicked ? updateExp?.data?.designation : "",
        company_name: updateExp?.clicked ? updateExp?.data?.company_name : "",
        duration: updateExp?.clicked ? updateExp?.data?.duration : "",
        location: updateExp?.clicked ? updateExp?.data?.location : ""
    });

    const handleOnChange = (event, key) => {
        setData({ ...data, [key]: event.target.value })
    }

    const handleUpdateExpSave = () => {
        let newFilteredData = selfData?.experience.filter((exp) => exp._id !== updateExp?.data?._id);
        let newArr = [...newFilteredData, data];
        let newData = { ...selfData, experience: newArr };
        handleEditFn(newData);
    }

    const handleOnSubmit = async () => {
        if (updateExp?.clicked) return handleUpdateExpSave();
        let expArr = [...selfData?.experience, data];
        let newData = { ...selfData, experience: expArr };
        handleEditFn(newData);
    }

    const handleOnDelete = () => {
        let newFilteredData = selfData?.experience.filter((exp) => exp._id !== updateExp?.data?._id);
        let newData = { ...selfData, experience: newFilteredData };
        handleEditFn(newData);
    }

    return (
        <div className="mt-8 w-full h-[350px] overflow-auto">
            <div className="w-full mb-4">
                <label htmlFor="">Role*</label>
                <br />
                <input value={data.designation} onChange={(e) => handleOnChange(e, 'designation')} type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Role" />
            </div>

            <div className="w-full mb-4">
                <label htmlFor="">Company*</label>
                <br />
                <input value={data.company_name} onChange={(e) => handleOnChange(e, 'company_name')} type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Company Name" />
            </div>

            <div className="w-full mb-4">
                <label htmlFor="">Duration*</label>
                <br />
                <input value={data.duration} onChange={(e) => handleOnChange(e, 'duration')} type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Duration" />
            </div>

            <div className="w-full mb-4">
                <label htmlFor="">Place*</label>
                <br />
                <input value={data.location} onChange={(e) => handleOnChange(e, 'location')} type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Place" />
            </div>

            <div className="flex justify-between">
                <div onClick={handleOnSubmit} className="bg-blue-500 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl">Save</div>
                {updateExp?.clicked && (  
                    <div onClick={handleOnDelete} className="bg-blue-500 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl">Delete</div>
                )}
            </div>
        </div>
    )
}