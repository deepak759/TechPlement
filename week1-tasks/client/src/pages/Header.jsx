import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  logOutUserStart,
  logOutUserFail,
  logOutUserSuccess,
} from "../redux/user/userSlice";
import logo from "../assets/logo.png";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      dispatch(logOutUserStart());
      const res = await fetch(`/api/user/logout`);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(logOutUserFail(data.message));
        return;
      }

      dispatch(logOutUserSuccess(data));
      navigate("/signin");
    } catch (error) {
      dispatch(logOutUserFail(error.message));
    }
  };
  return (
    <div>
      {currentUser ? (
        <header className="bg-[#2d2f4a] shadow-md fixed w-full top-0 z-50">
          <div className="flex justify-between items-center mx-auto p-3">
            <h1 className="font-bold  text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-100">Your</span>
              <span className="text-slate-300 ">Tasks</span>
            </h1>

            <p className="text-white font-semibold italic text-center">
              Every small todo today is a step closer to a successful tomorrow !
            </p>
            <button
              onClick={handleLogOut}
              className="bg-gray-300 text-red-600 hover:bg-gray-400  font-bold py-2 px-4 rounded-md"
            >
              Logout
            </button>
          </div>
        </header>
      ) : (
        <div>
          <header className="bg-[#2d2f4a] h-18  flex justify-center  items-center  p-3 shadow-md fixed w-full   py-5  z-50">
            <p className="text-white font-semibold italic px-10 text-center">
              Every day is a chance to take one step closer to your dreams.
              Start with a todo list and let success follow.
            </p>
          </header>
          <div className="flex items-center">
            <img
              src={logo}
              className="w-48 rounded-full mt-20 mx-auto"
              alt="Logo"
            />
          </div>
        </div>
      )}
    </div>
  );
}
