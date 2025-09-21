import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ allowedRoles }) {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || !user.role) {
        // Not logged in → redirect to login
        return <Navigate to="/Authentication/Login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Wrong role → redirect to home or 403 page
        return <Navigate to="/" replace />;
    }

    return <Outlet />; // Render child routes
}

export default PrivateRoute;
