
import { Advertisement } from "../../components/Advertisement/Advertisement"
export const Resume = () => {

    return (
        <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
            <div className="w-full py-5 sm:w-[74%]">
                <img src="https://resumod.co/images/resume-templates/sample-resume.webp" alt="resume" className="w-full h-full rounded-lg" />
            </div>

            <div className="w-[26%] py-5 hidden md:block">
                <div className="sticky top-19">
                    
                    <Advertisement />
                </div>
            </div>
        </div>
    )
}