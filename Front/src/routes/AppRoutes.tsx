import { Routes, Route, Navigate } from "react-router-dom";

// import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Navigate to="/Login" />} /> 
                
                {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
            </Routes>
    );
};

export default AppRoutes;
