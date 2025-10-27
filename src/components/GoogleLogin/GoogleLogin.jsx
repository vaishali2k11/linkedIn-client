
import { GoogleLogin } from "@react-oauth/google";

export const GoogleLoginComp = () => {

    const handleOnSuccess = (credResponse) => {
    console.log('credResponse:', credResponse)

    }
    return (
        <div className="w-full">
            <GoogleLogin
                onSuccess={(credentialResponse) => handleOnSuccess(credentialResponse)}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    )
}