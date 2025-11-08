
import { useState } from "react";
import { GoogleLoginComp } from "../../components/GoogleLogin/GoogleLogin";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = (props) => {
    const navigate = useNavigate();
    const [loginField, setLoginField] = useState({ email: "", password: "" });


    const handleOnChangeInput = (event, key) => {
        setLoginField({ ...loginField, [key]: event.target.value });
    }

    const handleLoginFn = async () => {
        try {
            if (loginField.email.trim().length === 0 || loginField.password.trim().length === 0) {
                return toast.error(`Please fill all credentials!`);
            }

            const response = await axios.post(`http://localhost:8080/api/auth/login`, loginField, { withCredentials: true });

            if (response) {
                localStorage.setItem('isLogin', true);
                localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                props.handleChangeLoginValue(true);
                navigate('/feeds')
            }
            toast.error(error?.response?.data?.error);
        } catch (error) {
            console.log('handleLoginFn error:', error)
            toast.error(error?.response?.data?.error);
        }
    }

    return (
        <div className="w-full min-h-[calc(100%-134px)] max-h-[calc(100%-134px)] overflow-y-auto h-full flex flex-col items-center justify-center">
            <div className="w-[85%] md:w-[28%] shadow-lg rounded-sm box p-10 mt-[18px]">
                <div className="text-3xl">Sign In</div>
                <div className="my-5"><GoogleLoginComp handleChangeLoginValue={props.handleChangeLoginValue} /></div>

                <div className="flex items-center gap-2">
                    <div className="border-b border-gray-400 w-[45%]" />
                    <div>or</div>
                    <div className="border-b border-gray-400 w-[45%] my-6" />
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email">Email</label>

                        <input onChange={(e) => handleOnChangeInput(e, 'email')} value={loginField.email} type="text" className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Email" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => handleOnChangeInput(e, 'password')} value={loginField.password} type="password" className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Password" />
                    </div>

                    <div onClick={handleLoginFn} className="w-full hover:bg-blue-500 bg-blue-800 text-white py-3 px-4 rounded-xl text-center text-xl cursor-pointer my-2">
                        Sign In
                    </div>
                </div>
            </div>

            <div className="mt-4 mb-2.5">New to LinkedIn? <Link to={'/signUp'} className="text-blue-800 cursor-pointer">Join Now</Link></div>

            <ToastContainer />
        </div>
    )
}