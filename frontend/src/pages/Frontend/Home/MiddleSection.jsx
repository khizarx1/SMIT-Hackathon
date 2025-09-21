import React from 'react';
import poorImg from '../../../assets/images/poor.jpg'


export default function MiddleSection() {


    return (
        <section className="middle-section py-20 bg-white">
            <div className="max-w-7xl mx-auto px-20 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                    <div className="section-badge flex items-center mb-4">
                        <div className="badge-line w-16 h-[2px] bg-green-600 mr-2"></div>
                        <span className="badge-text text-green-600 font-semibold">About DonateHub</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Improving Lives by Inspiring Food Sharing
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl mb-6">
                        There are many meaningful ways to create positive change in your community, and food donation stands out as
                        one of the most powerful. By donating surplus food, you not only help fight hunger and support those in
                        need, but also reduce food waste and strengthen the bonds within our society.
                    </p>

                    <h5 className="text-lg sm:text-xl font-semibold mb-4">DonateHub Special Services</h5>
                    <div className="features-list grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {[
                            'Fresh Food Distribution',
                            'Community Outreach',
                            'Emergency Food Relief',
                            'Family Support Programs',
                            'Child Nutrition Programs',
                            '24/7 Support & Help'
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <i className="fas fa-arrow-right text-green-600"></i>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <button className="read-more-btn px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition flex items-center gap-2">
                        <i className="fas fa-play"></i> Learn More
                    </button>
                </div>

                <div className="flex-1 flex justify-center lg:justify-end">
                    <img
                        src={poorImg}
                        alt="DonateHub Impact"
                        className="rounded-xl max-w-full h-[720px] object-cover"
                    />
                </div>

                <div className=" flex flex-col gap-6 text-center lg:text-left">
                    {[
                        { number: 15, label: 'Organizations' },
                        { number: 2500, label: 'Families Helped' },
                        { number: 850, label: 'Happy Donors' },
                        { number: 25, label: 'Awards Won' },
                    ].map((stat, index) => (
                        <div key={index} className="stat-item">
                            <div className="stat-number-large text-3xl sm:text-4xl md:text-5xl font-bold flex items-center justify-center lg:justify-start gap-1">
                                <span>{stat.number}</span>
                                <i className="fas fa-plus text-green-600"></i>
                            </div>
                            <div className="stat-title text-lg font-medium mt-1">{stat.label}</div>
                            <div className="stat-line w-12 h-[2px] bg-green-600 mt-2 mx-auto lg:mx-0"></div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}






