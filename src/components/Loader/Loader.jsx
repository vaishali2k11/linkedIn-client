import "./Loader.css";
export const Loader = () => {
  return (
    <div className="fixed top-[53px] left-0 w-full z-100 h-full bg-gray-200 flex justify-center items-center">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
