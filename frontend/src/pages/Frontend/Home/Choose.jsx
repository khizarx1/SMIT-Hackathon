import React from 'react';

const features = [
    {
        number: '01',
        icon: 'fas fa-handshake',
        title: 'Easy Connection',
        description:
            'Connect donors with recipients seamlessly through our user-friendly platform that makes sharing food simple and efficient.',
    },
    {
        number: '02',
        icon: 'fas fa-shield-alt',
        title: 'Safe & Secure',
        description:
            'All donations are verified and handled with the highest safety standards to ensure quality and freshness for recipients.',
    },
    {
        number: '03',
        icon: 'fas fa-clock',
        title: 'Real-time Tracking',
        description:
            'Track your donations and requests in real-time with instant notifications and updates on delivery status.',
    },
    {
        number: '04',
        icon: 'fas fa-leaf',
        title: 'Reduce Waste',
        description:
            'Help reduce food waste while feeding those in need in your community, creating a sustainable food ecosystem.',
    },
    {
        number: '05',
        icon: 'fas fa-users',
        title: 'Community Impact',
        description:
            'Build stronger communities by bringing people together through food sharing and creating lasting social connections.',
    },
    {
        number: '06',
        icon: 'fas fa-mobile-alt',
        title: 'Mobile Friendly',
        description:
            'Access our platform anywhere, anytime with our responsive design that works perfectly on all devices.',
    },
];

export default function Choose() {
    return (
        <section id="features" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="!text-5xl sm:text-4xl font-bold text-green-600 mb-4">Why Choose DonateHub?</h2>
                    <p className="text-gray-700 max-w-2xl mx-auto text-md">
                        We make food donation simple, efficient, and impactful for everyone involved in building a hunger-free community.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="feature-card bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col"
                        >
                            <div className="flex justify-between items-center  mb-4">
                                <div className="feature-number text-green-600 font-bold text-3xl mr-3">{feature.number}</div>
                                <i className={`${feature.icon} text-green-600 text-4xl`}></i>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 flex-grow text-sm">{feature.description}</p>
                            <a href="#" className="mt-4 inline-flex items-center text-green-600 font-semibold hover:underline">
                                Learn More <i className="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}