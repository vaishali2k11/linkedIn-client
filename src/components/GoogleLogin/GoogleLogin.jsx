
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const GoogleLoginComp = (props) => {
    const navigate = useNavigate();

    const handleOnSuccess = async (credResponse) => {
        try {
            const token = credResponse.credential;
            const response = await axios.post("http://localhost:4000/api/auth/google", { token }, { withCredentials: true });


            if(response) {
                localStorage.setItem('isLogin', true);
                localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                props.handleChangeLoginValue(true);
                navigate("/feeds");
            }

        } catch (error) {
            toast.error(error?.response?.data?.error);
        }
    }

    return (
        <div className="w-full">
            <GoogleLogin
                onSuccess={(credentialResponse) => handleOnSuccess(credentialResponse)}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            <ToastContainer />
        </div>
    )
}