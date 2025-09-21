import React from 'react';

function Footer() {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full bg-black text-gray-100">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-indigo-300/30 pb-6">
                <div className="md:max-w-96">
                    <svg width="157" height="40" viewBox="0 0 157 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* You can insert your logo SVG paths here */}
                    </svg>
                    <p className="mt-6 text-sm">
                        Donation Hub is dedicated to connecting generous donors with causes that matter.
                        Join us to make a positive impact on communities and lives worldwide.
                        Together, we can create change, one donation at a time.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-white">About</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-gray-300">Home</a></li>
                            <li><a href="#" className="hover:text-gray-300">Our Mission</a></li>
                            <li><a href="#" className="hover:text-gray-300">How it Works</a></li>
                            <li><a href="#" className="hover:text-gray-300">Impact Stories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5 text-white">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+92-300-123-4567</p>
                            <p>support@donationhub.com</p>
                            <p>123 Charity Street, City, Country</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5 text-gray-200">
                Copyright 2024 © <a href="https://donationhub.com" className="hover:text-gray-100">Donation Hub</a>. All Rights Reserved.
            </p>
        </footer>
    );
}

export default Footer;
