
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

export default function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
       
        {currentUser ? (
          <Route path="/" element={<Navigate to="/home" />} />
        ) : (
          <>
            <Route path="/" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        
        {currentUser && (
          <Route path="/home" element={<Home />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
