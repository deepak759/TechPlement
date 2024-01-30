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
        <Route path="/" element={currentUser ? <Home /> : <SignUp />} />

        <Route path="/signin" element={currentUser ? <Home /> :<SignIn />} />
        <Route path="/signup" element={currentUser ? <Home /> :<SignUp />} />
      
      </Routes>
    </BrowserRouter>
  );
}
