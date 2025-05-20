import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile"; 
import Login from "./pages/Login/Login";
import RegisteredUsers from "./pages/Register/RegisteredUser";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import VerifyCode from "./pages/ResetPassword/VerifyCode";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/registeredUsers" element={<RegisteredUsers />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;