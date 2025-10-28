
export const Footer = () => {

    return (
        <div className="w-full bg-gray-200 flex justify-center">
            <div className="md:p-3 w-full flex flex-col items-center py-4">
                <div className="flex gap-0 items-center cursor-pointer">
                    <h3 className="text-blue-800 font-bold text-xl">Linked</h3>
                    <img src="/Logo/linkedIn-logo.png" alt="LinkedInLogo" className="w-6 h-6" />
                </div>
                <div className="text-sm">@Copyright 2025</div>
            </div>
        </div>
    )
}