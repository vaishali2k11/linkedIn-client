
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { GoogleLoginComp } from "../../components/GoogleLogin/GoogleLogin";

const SignUp = (props) => {
    const navigate = useNavigate();
    const [registerFields, setRegisterFields] = useState({
        email: "",
        password: "",
        f_name: "",
    });


    const handleOnChangeInput = (event, key) => {
        setRegisterFields({ ...registerFields, [key]: event.target.value });
    }

    const handleRegisterFn = async () => {
        try {
            if (registerFields.email.trim().length === 0 || registerFields.password.trim().length === 0 || registerFields.f_name.trim().length === 0) {
                toast.error(`Please fill all credentials!`);
            }

            const response = await axios.post('http://localhost:8080/api/auth/register', registerFields);

            if (response) {
                toast.success(`You have registered successfully!`);
                setRegisterFields({ ...registerFields, email: "", password: "", f_name: "" })
                navigate("/signIn")
            }
        } catch (error) {
            console.log('handleRegisterFn error:', error)
            toast.error(error?.response?.data?.error);
        }
    }

    return (
        <div className="w-full max-h-[calc(100%-134px)] overflow-y-auto min-h-[calc(100%-134px)] h-full flex flex-col items-center justify-center">
            {/* <div className="text-4xl mb-5 mt-[110px]">Make the most of your professional life</div> */}
            <div className="w-[85%] md:w-[28%] shadow-xl rounded-sm box p-10 py-6 pt-4">
                <div className="flex flex-col gap-4">
                    <div className="text-3xl">Sign In</div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input value={registerFields.email} onChange={(e) => handleOnChangeInput(e, 'email')} type="text" className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Email" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input value={registerFields.password} onChange={(e) => handleOnChangeInput(e, 'password')} type="password" className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Password" />
                    </div>
                    <div>
                        <label htmlFor="f_name">Full Name</label>
                        <input value={registerFields.f_name} onChange={(e) => handleOnChangeInput(e, 'f_name')} type="text" className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="fullName" />
                    </div>

                    <div onClick={handleRegisterFn} className="w-full hover:bg-blue-500 bg-blue-800 text-white py-3 px-4 rounded-xl text-center text-xl cursor-pointer my-2">
                        Register
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="border-b border-gray-400 w-[45%]" />
                    <div>or</div>
                    <div className="border-b border-gray-400 w-[45%] my-6" />
                </div>

                <div><GoogleLoginComp handleChangeLoginValue={props.handleChangeLoginValue} /></div>
            </div>
            <div className="mt-4 mb-2.5">Already on LinkedIn? <Link to={'/signIn'} className="text-blue-800 cursor-pointer">Sign in</Link></div>
            <ToastContainer />
        </div>
    )
}


export default SignUp;