
import './Navbar2.css'
export const Navbar2 = () => {

    return (
        <div className="bg-white h-[52px] flex justify-between py-1 px-5 xl:px-50 fixed top-0 w-full z-100">
            <div className="flex gap-2 items-center">
                <div>
                    <img src={'../../../public/Logo/linkedIn-logo.png'} alt="LinkedInLogo" className="w-8 h-8" />
                </div>
                <div className="relative">
                    <input className="searchInput w-70 bg-gray-100 rounded-sm h-10 px-4" type="text" placeholder="Search" />
                </div>
            </div>
        </div>
    )
}