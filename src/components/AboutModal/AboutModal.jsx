
export const AboutModal = () => {

    return (
        <div className="my-8">
            <div className="w-full mb-4">
                <label htmlFor="">About*</label>
                <br />
                <textarea className="p-2 mt-1 w-full border rounded-md" cols={10} rows={3} name="" id=""></textarea>
            </div>

            <div className="w-full mb-4">
                
                <label htmlFor="">Skills*(Add by seperating comma)</label>
                <br />
                <textarea className="p-2 mt-1 w-full border rounded-md" cols={10} rows={3} name="" id=""></textarea>
            </div>

            <div className="w-full mb-4">
                <label htmlFor="resumeUpload" className="p-2 bg-blue-800 text-white rounded-lg cursor-pointer">Resume Upload</label>
                <input type="file" className="hidden" id="resumeUpload" />
                <div className="my-2">adfjdsk</div>
            </div>

            <div className="bg-blue-500 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl">Save</div>
        </div>
    )
}