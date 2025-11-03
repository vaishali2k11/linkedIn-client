
import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import { Card } from "../Card/Card"

export const Post = ({ profile, postData, personalData }) => {
    const [seeMore, setSeeMore] = useState(false);
    const [comment, setComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [noOfLikes, setNoOfLikes] = useState(postData?.likes?.length);
    const [commentText, setCommentText] = useState("");

    const desc = postData?.desc

    useEffect(() => {
        let selfId = personalData?._id
        postData?.likes?.map((like) => {
            if (like.toString() === selfId.toString()) {
                setLiked(true);
                return
            } else {
                setLiked(false);
            }
        })
    }, [])

    const handleSendComment = async (e) => {
        e.preventDefault();
        try {
            if (commentText.trim().length === 0) return toast.error(`Please enter comment!`);

            const response = await axios.post(`http://localhost:8080/api/comment/create-comment`, {
                postId: postData?._id,
                comment: commentText
            }, { withCredentials: true });

            if (response) {
                setComments([response?.data?.comment, ...comments]);
                setCommentText("");
            }
        } catch (error) {
            console.log('error:', error)
            toast.error(error?.response?.data?.error);
        }
    }

    const handleLikedFn = async () => {
        try {
            const response = await axios.put("http://localhost:8080/api/post/like-dislike", {
                postId: postData?._id
            }, { withCredentials: true })

            if (response) {
                if (liked) {
                    setNoOfLikes((prev) => prev - 1);
                    setLiked(false);
                } else {
                    setLiked(true);
                    setNoOfLikes((prev) => prev + 1);
                }
            }
        } catch (error) {
            console.log('error:', error)
            toast.error('Something went wrong!')
        }
    }

    const handleCommentBoxOpenClose = async () => {
        try {
            setComment(true);
            const response = await axios.get(`http://localhost:8080/api/comment/get-post-comment/${postData?._id}`, {
                withCredentials: true
            });

            if (response) {
                setComments(response?.data?.comments);
            }

        } catch (error) {
            console.log('error:', error)
            toast.error("Something went wrong!")
        }
    }

    return (
        <Card padding={0}>
            <div className="flex gap-3 p-4">
                <Link to={`/profile/${postData?.user?._id}`} className="w-12 h-12 rounded-4xl">
                    <img src={postData?.user?.profile_pic} alt="" className="rounded-4xl w-12 h-12 border-2 border-white cursor-pointer" />
                </Link>
                <div>
                    <div className="text-lg font-semibold">{postData?.user?.f_name}</div>

                    <div className="text-xs text-gray-500">{postData?.user?.headline}</div>
                </div>
            </div>

            {/* {desc && desc.length > 0 && ( */}
                 {/* <> */}
                    <div className="text-md p-4 my-3 whitespace-pre-line grow">
                        {seeMore ? desc : `${desc?.slice(0, 35)} ${desc?.length > 65 ? '...' : ''}`} {desc?.length < 65 ? null : <span onClick={() => setSeeMore((prev) => !prev)} className="cursor-pointer text-gray-500 hover:underline">{seeMore ? "See Less" : "See More"}</span>}
                    </div>
                {/* </> */}
            {/* )} */}

            {postData && postData.image_link && (
                <>
                    <div className="w-full h-[300px]">
                        <img src={postData?.image_link} alt="Post Image" className="w-full h-full" />
                    </div>
                </>
            )}

            <div className="my-2 p-4 flex justify-between items-center">
                <div className="flex gap-1 items-center">
                    <ThumbUpIcon sx={{ color: "blue", fontSize: 12 }} /> <span className="text-sm text-gray-600">{noOfLikes} Likes</span>
                </div>
                <div className="flex gap-1 items-center">
                    <span className="text-sm text-gray-600">{postData?.comments} Comments</span>
                </div>
            </div>

            {!profile && (
                <>
                    <div className="flex p-1">
                        <div onClick={handleLikedFn} className="w-[33%] justify-center flex gap-2 items-center border-r border-gray-100 p-2 cursor-pointer hover:bg-gray-100">{liked ? <ThumbUpIcon sx={{ fontSize: 22, color: "blue" }} /> : <ThumbUpOutlinedIcon sx={{ fontSize: 22 }} />} <span>{liked ? 'Liked' : 'Like'}</span></div>
                        <div onClick={handleCommentBoxOpenClose} className="w-[33%] justify-center flex gap-2 items-center border-r border-gray-100 p-2 cursor-pointer hover:bg-gray-100"><CommentIcon sx={{ fontSize: 22, color: "blue" }} /> <span>Comment</span></div>
                        <div className="w-[33%] justify-center flex gap-2 items-center border-r border-gray-100 p-2 cursor-pointer hover:bg-gray-100"><SendIcon sx={{ fontSize: 22, color: "blue" }} /> <span>Share</span></div>
                    </div>
                </>
            )}

            {/* Comment Section */}
            {comment && (
                <>
                    <div className="p-4 w-full">
                        <div className="flex gap-2 items-center">
                            <img src={personalData?.profile_pic} alt="Profile Logo" className="rounded-full w-12 h-12 border-2 border-white cursor-pointer" />

                            <form action="" className="w-full flex gap-2" onSubmit={handleSendComment}>
                                <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add a comment..." className="w-full border py-3 px-5 rounded-3xl hover:bg-gray-100" type="text" />
                                <button type="submit" className="cursor-pointer bg-blue-800 text-white rounded-3xl py-1 px-7">Send</button>
                            </form>
                        </div>

                        {/* Other's comment section */}
                        <div className="w-full p-4">
                            {comments.map((comment, index) => {
                                return (
                                    <>
                                        <div className="my-4">
                                            <div className="flex gap-3">
                                                <img src={comment?.user?.profile_pic} alt="Profile Logo" className="rounded-full w-10 h-10 border-2 border-white cursor-pointer" />

                                                <div className="cursor-pointer">
                                                    <div className="text-md">{comment?.user?.f_name}</div>
                                                    <div className="text-sm text-gray-500">{comment?.user?.headline}</div>
                                                </div>
                                            </div>

                                            <div className="px-11 my-2">{comment?.comment}</div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </>
            )}

            <ToastContainer />
        </Card>
    )
}