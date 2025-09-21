import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NGODashboard from './NGODashboard';
import DONORDashboard from './DONORDashboard';
import Campaign from './Campaign';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <Routes>
            {/* Auto redirect based on role */}
            <Route
                path="/"
                element={
                    <Navigate
                        to={user.role === "ngo" ? "NGODashboard" : "DONORDashboard"}
                        replace
                    />
                }
            />

            <Route path="NGODashboard" element={<NGODashboard />} />
            <Route path="DONORDashboard" element={<DONORDashboard />} />
            <Route path="Campaign" element={<Campaign />} />
        </Routes>
    );
}

export default Dashboard;
