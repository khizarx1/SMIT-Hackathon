import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';
import { User, Heart, FileText, DollarSign, Calendar, Target, Users } from 'lucide-react';
import { toast } from 'react-toastify';

const NGODashboard = () => {
    const { user } = useContext(UserContext);

    // Mock donation history
    const [donations] = useState([
        { id: 1, amount: 5000, campaign: "Education for All", date: "2024-09-15", status: "Completed" },
        { id: 2, amount: 3000, campaign: "Clean Water Project", date: "2024-09-10", status: "Completed" },
        { id: 3, amount: 7500, campaign: "Medical Aid Fund", date: "2024-09-05", status: "Pending" },
        { id: 4, amount: 2000, campaign: "Flood Relief", date: "2024-08-30", status: "Completed" }
    ]);

    // Campaign form state
    const [campaign, setCampaign] = useState({
        title: '',
        description: '',
        targetAmount: '',
        category: 'education',
        image: null
    });

    const handleCampaignSubmit = async () => {
        if (!campaign.title || !campaign.description || !campaign.targetAmount) {
            return alert("Please fill all required fields");
        }

        try {
            const token = localStorage.getItem("accessToken");

            const formData = new FormData();
            formData.append("title", campaign.title);
            formData.append("description", campaign.description);
            formData.append("targetAmount", campaign.targetAmount);
            formData.append("category", campaign.category);
            if (campaign.image) formData.append("image", campaign.image);

            const res = await axios.post(
                "http://localhost:5000/api/campaigns",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            toast.success('Campaign created successfully');
            setCampaign({
                title: '',
                description: '',
                targetAmount: '',
                category: 'education',
                image: null
            });

        } catch (err) {
            console.error(err);
            toast.error('Failed to create campaign');
        }
    };

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
                            <Calendar size={16} />
                            <span>Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <DollarSign size={16} />
                            <span>Total Donations: ₹{donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}</span>
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
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">NGO Dashboard</h1>
                        <p className="text-gray-400">Welcome back, {user?.fullName}!</p>
                    </div>

                    {/* Campaign Form */}
                    <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText size={24} className="text-white" />
                            <h2 className="text-2xl font-semibold">Create New Campaign</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Campaign Title</label>
                                    <input
                                        type="text"
                                        value={campaign.title}
                                        onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white"
                                        placeholder="Enter campaign title"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Target Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={campaign.targetAmount}
                                        onChange={(e) => setCampaign({ ...campaign, targetAmount: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white"
                                        placeholder="Enter target amount"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    value={campaign.description}
                                    onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
                                    rows="4"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white resize-none"
                                    placeholder="Describe your campaign..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Campaign Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setCampaign({ ...campaign, image: e.target.files[0] })}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white cursor-pointer"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Category</label>
                                    <select
                                        value={campaign.category}
                                        onChange={(e) => setCampaign({ ...campaign, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-white"
                                    >
                                        <option value="education">Education</option>
                                        <option value="health">Health</option>
                                        <option value="environment">Environment</option>
                                        <option value="disaster">Disaster Relief</option>
                                        <option value="poverty">Poverty Alleviation</option>
                                    </select>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        onClick={handleCampaignSubmit}
                                        className="px-8 py-3 bg-white cursor-pointer text-black rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
                                    >
                                        <Target size={18} />
                                        Create Campaign
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                    <p className="text-2xl font-semibold">5</p>
                                </div>
                                <FileText size={32} className="text-gray-500" />
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

export default NGODashboard;
