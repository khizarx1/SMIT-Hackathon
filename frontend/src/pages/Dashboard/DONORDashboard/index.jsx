import React, { useState, useContext } from 'react';
import { User, Heart, DollarSign, Calendar, Mail, Users } from 'lucide-react';
import { UserContext } from '../../../context/UserContext';

const DONORDashboard = () => {
    const { user } = useContext(UserContext);

    // Mock donation history
    const [donations] = useState([
        { id: 1, amount: 2500, campaign: "Education for All", date: "2024-09-18", status: "Completed" },
        { id: 2, amount: 4000, campaign: "Clean Water Project", date: "2024-09-12", status: "Completed" },
        { id: 3, amount: 1500, campaign: "Medical Aid Fund", date: "2024-09-06", status: "Pending" },
        { id: 4, amount: 3000, campaign: "Flood Relief", date: "2024-08-31", status: "Completed" }
    ]);

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
                {/* User Profile Section */}
                <div className="p-6 border-b border-gray-700">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 bg-gray-700 flex items-center justify-center">
                            {user?.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User size={32} className="text-gray-300" />
                            )}
                        </div>
                        <h2 className="text-xl font-semibold mb-1">{user?.fullName}</h2>
                        <span className="px-3 py-1 bg-gray-700 rounded-full text-sm capitalize">{user?.role}</span>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <Mail size={16} />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <Calendar size={16} />
                            <span>Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</span>
                        </div>
                    </div>
                </div>

                {/* Donation History */}
                <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Heart size={20} className="text-white" />
                        <h3 className="text-lg font-semibold">Donation History</h3>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {donations.map((donation) => (
                            <div key={donation.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium text-sm">{donation.campaign}</h4>
                                    <span className={`px-2 py-1 rounded text-xs ${donation.status === 'Completed'
                                            ? 'bg-green-900 text-green-300'
                                            : 'bg-yellow-900 text-yellow-300'
                                        }`}>
                                        {donation.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-400">
                                    <span className="font-semibold text-white">₹{donation.amount.toLocaleString()}</span>
                                    <span>{new Date(donation.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Total Donated:</span>
                            <span className="font-semibold">₹{donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Donor Dashboard</h1>
                        <p className="text-gray-400">Welcome back, {user?.fullName}!</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Total Donations</p>
                                    <p className="text-2xl font-semibold">₹{donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}</p>
                                </div>
                                <DollarSign size={32} className="text-gray-500" />
                            </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Active Campaigns</p>
                                    <p className="text-2xl font-semibold">12</p>
                                </div>
                                <Users size={32} className="text-gray-500" />
                            </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">People Helped</p>
                                    <p className="text-2xl font-semibold">1,247</p>
                                </div>
                                <Users size={32} className="text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DONORDashboard;
