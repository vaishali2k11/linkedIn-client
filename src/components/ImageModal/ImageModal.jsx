
export const ImageModal = ({ isCircular }) => {

    return (
        <div className="p-5 relative flex items-center flex-col h-full">
            {isCircular ? (
                <>
                    <img src="https://avatar.iran.liara.run/public/boy?username=Ash" alt="" className="rounded-full w-[150px] h-[150px]" />
                </>
            ) : (
                <>
                    <img src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM3fHx8ZW58MHx8fHx8" alt="" className="rounded-xl w-full h-[200px] object-cover" />
                </>
            )}
            
            <label htmlFor="btn-submit" className="absolute bottom-10 left-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer">Upload</label>
            <input type="file" className="hidden" id="btn-submit" />

            <div className="absolute bottom-10 right-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer">Submit</div>

        </div>
    )
}