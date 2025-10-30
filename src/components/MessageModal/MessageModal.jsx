
export const MessageModal = () => {

    return (
        <div className="my-5">
            <div className="w-full mb-4">
                <label htmlFor="">Message*</label>
                <br />
                <textarea className="p-2 mt-1 w-full border rounded-md" placeholder="Enter Message" cols={10} rows={5} name="" id=""></textarea>
            </div>

            <div className="bg-blue-500 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl">Save</div>
            
        </div>
    )
}