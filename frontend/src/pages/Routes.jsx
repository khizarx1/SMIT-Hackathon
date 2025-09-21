import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Frontend from './Frontend';
import Authentication from './authentication';
import Dashboard from './Dashboard';
import PrivateRoute from '../protectedRoute/PrivateRoute';
import NotFound from './NotFound';

function Index() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/*" element={<Frontend />} />
                <Route path="/Authentication/*" element={<Authentication />} />

                {/* Protected Dashboard Routes */}
                <Route element={<PrivateRoute allowedRoles={["donor", "ngo"]} />}>
                    <Route path="/Dashboard/*" element={<Dashboard />} />
                </Route>

                {/* 404 - Page Not Found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Index;
