import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { UserContext } from '../../../context/UserContext';
import { toast } from 'react-toastify';

function ActiveCampaigns() {
    const { user } = useContext(UserContext);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCampaigns = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/campaigns'); // Backend endpoint
            console.log("API Response:", res.data);
            if (res.data.success) {
                setCampaigns(res.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch campaigns:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this campaign?')) return;

        try {
            const token = localStorage.getItem('accessToken'); // NGO JWT token
            const res = await axios.delete(`http://localhost:5000/api/campaigns/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success) {
                toast.success('Campaign deleted successfully');
                // remove deleted campaign from state
                setCampaigns(campaigns.filter((c) => c._id !== id));
            }
        } catch (err) {
            console.error('Failed to delete campaign:', err);
            toast.error('Failed to delete campaign');
        }
    };

    if (loading) {
        return (
            <div className="pt-24 flex justify-center items-center min-h-screen">
                <p className="text-lg font-medium">Loading campaigns...</p>
            </div>
        );
    }

    return (
        <div className="pt-24">
            <Header />
            <div className="p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Active Campaigns</h1>

                {campaigns.length === 0 ? (
                    <p className="text-center text-gray-500">No active campaigns found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {campaigns.map((campaign) => (
                            <div
                                key={campaign._id}
                                className="max-w-72 w-full hover:-translate-y-0.5 transition duration-300 border border-gray-200 rounded-lg p-2 relative"
                            >
                                {campaign.image ? (
                                    <img
                                        className="rounded-xl w-full h-40 object-cover"
                                        src={campaign.image}
                                        alt={campaign.title}
                                    />
                                ) : (
                                    <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}

                                <h3 className="text-base text-slate-900 font-medium mt-3">{campaign.title}</h3>
                                <p className="text-xs font-medium mt-1">{campaign.description}</p>
                                <p className="text-xs text-red-600 font-medium mt-1">
                                    Target: ₹{campaign.targetAmount.toLocaleString()}
                                </p>
                                {campaign.status === 'active' ? (
                                    <p className="text-xs text-green-600 font-medium mt-1">Active</p>
                                ) : (
                                    <p className="text-xs text-gray-500 font-medium mt-1">Completed</p>
                                )}

                                {/* Delete Button: Only NGO can see */}
                                {user?.role === 'ngo' && (
                                    <button
                                        onClick={() => handleDelete(campaign._id)}
                                        className="text-white font-bold text-sm px-2 py-1 bg-black rounded-lg cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ActiveCampaigns;
