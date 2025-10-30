
import { Card } from "../../components/Card/Card"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ImageIcon from '@mui/icons-material/Image';
import { Conversation } from "../../components/Conversation/Conversation";
import { Advertisement } from "../../components/Advertisement/Advertisement";

export const Messages = () => {
    
    return (
        <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
            <div className="w-full justify-between flex pt-5">
                {/* Left Side */}
                <div className="w-full md:w-[70%]">
                    <Card padding={0}>
                        <div className="border-b border-gray-300 px-5 py-2 font-semibold text-lg">
                            Messaging
                        </div>

                        <div className="border-b border-gray-300 px-5 py-2">
                            <div className="py-1 px-3 cursor-pointer hover:bg-green-900 bg-green-800 font-semibold flex gap-2 w-fit rounded-2xl text-white">Focused <ArrowDropDownIcon /></div>
                        </div>

                        {/* Div for chat */}

                        <div className="w-full md:flex">
                            <div className="h-[590px] overflow-auto w-full md:w-[40%] border-r border-gray-400">
                                {/* For each chat conversation */}
                                <Conversation />
                            </div>

                            <div className="w-full md:w-[60%] border-gray-400">
                                <div className="broder-gray-300 py-2 px-4 border-b flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-semibold">User 1</p>
                                        <p className="text-sm text-gray-400">Hi This is user 1</p>
                                    </div>
                                    <div><MoreHorizIcon /></div>
                                </div>

                                <div className="h-[360px] w-full overflow-auto border-b border-gray-300">
                                    <div className="w-full border-b border-gray-300 gap-3 p-4">
                                        <img src="https://avatar.iran.liara.run/public/boy?username=Ash" alt="Profile Logo" className="rounded-full cursor-pointer w-16 h-16" />

                                        <div className="my-2">
                                            <div className="text-md">User 1</div>
                                            <div className="text-sm text-gray-500">Hi This is user 1</div>
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        {/* For each messages */}
                                        <div className="flex w-full cursor-pointer border-gray-300 gap-3 p-4">
                                            <div className="shrink-0">
                                                <img src="https://avatar.iran.liara.run/public/boy?username=Ash" alt="" className="w-8 h-8 rounded-full cursor-pointer" />
                                            </div>

                                            <div className="mb-2 w-full">
                                                <div className="text-md">User 1</div>

                                                <div className="text-sm mt-6 hover:bg-gray-200">This is text message</div>
                                                <div className="my-2">
                                                    <img src="https://marketplace.canva.com/MADasktKyQ4/1/thumbnail_large-1/canva-colorful-summer-landscape-MADasktKyQ4.jpg" alt="" className="w-60 h-[180px] rounded-md" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>

                                 {/* Space for typing messages  */}
                                <div className="p-2 w-full border-b border-gray-200">
                                    <textarea rows={4} className="bg-gray-200 outline-0 rounded-xl text-sm w-full p-3" placeholder="Write a message" name="" id=""></textarea>
                                </div>

                                <div className="p-3 flex justify-between">
                                    <div>
                                        <label htmlFor="messageImage" className="cursor-pointer"><ImageIcon /></label>
                                        <input type="file" id="messageImage" className="hidden" />
                                    </div>

                                    <div className="px-3 py-1 cursor-pointer rounded-2xl border bg-blue-950 text-white">
                                        Send
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Side */}
                <div className="hidden md:flex md:w-[25%]">
                    <div className="sticky top-19">
                        <Advertisement /> 
                    </div>
                </div>
            </div>
        </div>
    )
}