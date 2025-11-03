
import { useState } from "react"

export const EditInfoModal = ({selfData, handleEditFn}) => {

    const [data, setData] = useState({
        f_name: selfData.f_name,
        headline: selfData.headline,
        curr_company: selfData.curr_company,
        curr_location: selfData.curr_location
    })

    
    const handleOnChange = (event, key) => {
        setData({...data, [key]: event.target.value})
    }

    const handleSaveBtn = async () => {
        let newData = { ...selfData, ...data }
        handleEditFn(newData)
    }

    return (
        <div className="mt-8 w-full h-[350px] overflow-auto">
            <div className="w-full mb-4">
                <label htmlFor="f_name">Full Name*</label>
                <br />
                <input value={data.f_name} onChange={(e) => handleOnChange(e, 'f_name')} type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Full Name" />
            </div>

            <div className="w-full mb-4">
                
                <label htmlFor="">Headline*</label>
                <br />
                <textarea value={data.headline} onChange={(e) => handleOnChange(e, 'headline')} className="p-2 mt-1 w-full border rounded-md" cols={10} rows={3} name="" id=""></textarea>
            </div>

            <div className="w-full mb-4">
                <label htmlFor="">Current Company*</label>
                <br />
                <input value={data.curr_company} onChange={(e) => handleOnChange(e, 'curr_company')} type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Current Company" />
            </div>

            <div className="w-full mb-4">
                <label htmlFor="">Current Location*</label>
                <br />
                <input value={data.curr_location} onChange={(e) => handleOnChange(e, 'curr_location')} type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Current Location" />
            </div>

            <div onClick={handleSaveBtn} className="bg-blue-500 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl">Save</div>

        </div>
    )
}