
export const EditInfoModal = () => {

    return (
        <div className="mt-8 w-full h-[350px] overflow-auto">
            <div className="w-full mb-4">
                <label htmlFor="">Full Name*</label>
                <br />
                <input type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Full Name" />
            </div>

            <div className="w-full mb-4">
                
                <label htmlFor="">Headline*</label>
                <br />
                <textarea className="p-2 mt-1 w-full border rounded-md" cols={10} rows={3} name="" id=""></textarea>
            </div>

            <div className="w-full mb-4">
                <label htmlFor="">Current Company*</label>
                <br />
                <input type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Current Company" />
            </div>

            <div className="w-full mb-4">
                <label htmlFor="">Current Location*</label>
                <br />
                <input type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Current Location" />
            </div>

            <div className="bg-blue-500 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl">Save</div>

        </div>
    )
}