import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Oops! Page Not Found</h2>
            <p className="text-gray-700 mb-6">The page you are looking for might have been removed or is temporarily unavailable.</p>
            <Link
                to="/"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}

export default PageNotFound;
