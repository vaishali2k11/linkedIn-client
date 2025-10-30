
export const ExpModal = () => {

    return (
        <div className="mt-8 w-full h-[350px] overflow-auto">
            <div className="w-full mb-4">
                <label htmlFor="">Role*</label>
                <br />
                <input type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Role" />
            </div>

            <div className="w-full mb-4">

                <label htmlFor="">Company*</label>
                <br />
                <input type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Company Name" />
            </div>

            <div className="w-full mb-4">
                <label htmlFor="">Duration*</label>
                <br />
                <input type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Duration" />
            </div>

            <div className="w-full mb-4">
                <label htmlFor="">Place*</label>
                <br />
                <input type="text" className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Place" />
            </div>

            <div className="bg-blue-500 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl">Save</div>
        </div>
    )
}