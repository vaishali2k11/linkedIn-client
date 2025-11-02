
import { Link } from "react-router-dom"
import { GoogleLoginComp } from "../../components/GoogleLogin/GoogleLogin"

export const LandingPage = (props: any) => {

    return (
        <div className="my-4 py-[50px] md:pl-[120px] px-5 md:flex justify-between">
            <div className="md:w-[40%]">
                <div className="text-4xl mx-auto text-gray-500">
                    Welcome To Your Professional Community
                </div>

                <div className="my-3 flex mx-auto mt-5 bg-white gap-2 rounded-3xl w-[70%] text-black cursor-pointer">
                    <GoogleLoginComp handleChangeLoginValue={props.handleChangeLoginValue} />
                </div>

                <Link to={'/signIn'} className="flex mx-auto mt-5 py-2 px-2 bg-white gap-2 rounded-3xl items-center w-[70%] justify-center text-black hover:bg-gray-100 border-2 cursor-pointer">
                    Sign In with email
                </Link>
                <div className="mx-auto mb-4 text-sm w-[70%] mt-6">
                    By clicking continue to join or sign in, you agree to <span className="text-blue-800 cursor-pointer hover:underline">LinkedIn's User Agreement</span>, <span className="text-blue-800 cursor-pointer hover:underline">Privacy Policy</span>, and <span className="text-blue-800 cursor-pointer hover:underline">Cookie Policy</span>.
                </div>
                <Link to={'/signUp'} className="mx-auto text-center mb-4 text-lg w-[70%] mt-4">
                    New to LinkedIn? <span className="text-blue-800 cursor-pointer hover:underline">Join now</span>
                </Link>
            </div>

            <div className="md:w-[50%] h-120">
                <img src={`https://media.licdn.com/media//AAYAAgSrAAgAAQAAAAAAAGM6w-NyPk-_SVikYiCJ6V3Z-Q.png`} className="w-full h-full" alt="landing-img" />
            </div>
        </div>
    )
}