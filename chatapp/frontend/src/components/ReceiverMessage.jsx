import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function ReceiverMessage({ message }) {
//   const scroll = useRef();
  const selectedUser = useSelector((state) => state.user);

//   useEffect(() => {
//     scroll.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
//   }, [message]);

  return (
    <div
      className="w-fit max-w-[500px] px-[20px] py-[5px] bg-[#51d351] text-white text-[19px] rounded-tl-none rounded-2xl shadow-gray-400 shadow-lg"
    >
      {message && <span>{message}</span>}
    </div>
  );
}

export default ReceiverMessage;
