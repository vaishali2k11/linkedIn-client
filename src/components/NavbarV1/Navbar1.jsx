
import { Link } from "react-router-dom";

export const Navbar1 = () => {

    return (
        <nav className="w-full bg-gray-100 md:px-[100px] px-5 flex justify-between py-4 box-border">
            <Link to={'/'} className="flex justify-between">
                <div className="flex gap-1 items-center cursor-pointer">
                    <h3 className="text-blue-800 font-bold text-3xl">Linked</h3>
                    <img src="../../../public/Logo/linkedIn-logo.png" alt="LinkedInLogo" className="w-6 h-6" />
                </div>
            </Link>
            <div className="flex box-border md:gap-1 gap-2 justify-center items-center">
                <Link to={'/signUp'} className="md:px-4 md:py-2 box-border text-black rounded-3xl text-xl hover:bg-gray-200 cursor-pointer">
                    Join now
                </Link>
                <Link to={'/signIn'} className="px-4 py-2 box-border border text-blue-800 border-blue-800 rounded-3xl text-xl hover:bg-blue-50 cursor-pointer">
                    Sign In
                </Link>
            </div>
        </nav>
    )
}