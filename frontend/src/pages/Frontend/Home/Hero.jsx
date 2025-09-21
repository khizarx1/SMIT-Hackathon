import React from 'react';
import heroImg from '../../../assets/images/hero.jpg';
import { Link } from 'react-router-dom'

function HeroSection() {
    return (
        <div
            className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-32 text-white min-h-screen"
            style={{
                backgroundImage: `url(${heroImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Background overlay for darkening (lighter for visibility) */}
            <div className="absolute inset-0 bg-green-700/20 -z-10"></div>

            {/* Background blur circle */}
            <div className="absolute top-28 left-1/4 w-72 h-72 bg-green-500 rounded-full blur-[300px] -z-10"></div>

            {/* Promo Badge */}
            <Link to={'/'} className="group flex items-center gap-2 rounded-full p-1 pr-3 mt-36 text-green-50 bg-green-200/20">
                <span className="bg-green-900 text-white text-xs px-3.5 py-1 rounded-full">
                    NEW
                </span>
                <p className="flex items-center gap-1">
                    <span>Start donating today</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right group-hover:translate-x-0.5 transition duration-300">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </p>
            </Link>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-semibold text-center mt-6 max-w-3xl leading-tight">
                Make a Difference with <span className="bg-gradient-to-r from-green-400 to-green-200 px-3 rounded-xl">Donation Hub</span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-center text-green-100 mt-4 max-w-xl">
                Connect with meaningful causes, support communities, and impact lives.
                No complexity, no middlemen—just a straightforward way to donate and create change.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
                <button className="bg-green-400 hover:bg-green-300 text-white rounded-full px-7 h-12 md:h-14 font-medium transition">
                    Donate Now
                </button>
                <button className="flex items-center gap-2 border border-green-200 hover:bg-green-600/30 transition rounded-full px-6 h-12 md:h-14 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video">
                        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                        <rect x="2" y="6" width="14" height="12" rx="2" />
                    </svg>
                    <span>Watch Demo</span>
                </button>
            </div>

            {/* Features / Highlights */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mt-12">
                <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-green-100">No credit card required</span>
                </p>
                <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-green-100">Support causes instantly</span>
                </p>
                <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-green-100">Set up in minutes</span>
                </p>
            </div>
        </div>
    );
}

export default HeroSection;
