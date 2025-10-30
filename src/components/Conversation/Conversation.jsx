
export const Conversation = () => {

    return (
        <div className="flex items-center w-full cursor-pointer border-b bordre-gray-300 gap-3 p-4 hover:bg-gray-200">
            <div className="shrink-0">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5TPu3HoTZkTyxzVY6h3fuKo-nPU85G5u4Vw&s" alt="dummy" className="w-12 h-12 rounded-full cursor-pointer" />
            </div>
            <div className="">
                <div className="text-md">User 1</div>
                <div className="text-sm text-gray-500">Engineer Amazon</div>
            </div>
        </div>
    )
}