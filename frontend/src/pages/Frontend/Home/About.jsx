import React from 'react'
import aboutImg from '../../../assets/images/about.jpg'

function About() {
    return (
        <section className="py-10">
            <h1 className="text-3xl font-semibold text-center mx-auto">About DonateHub</h1>
            <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
                A platform connecting generous donors with NGOs and social campaigns — making giving transparent, simple, and impactful.
            </p>

            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10">
                <img
                    className="max-w-sm w-full rounded-xl h-auto"
                    src={aboutImg}
                    alt="Charity"
                />

                <div>
                    <h1 className="text-3xl font-semibold">Our Key Features</h1>
                    <p className="text-sm text-slate-500 mt-2">
                        DonateHub empowers donors and NGOs by providing a transparent platform for campaigns, donations, and social impact tracking.
                    </p>

                    <div className="flex flex-col gap-10 mt-6">
                        <div className="flex items-center gap-4">
                            <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                                <img
                                    src="https://img.icons8.com/emoji/48/000000/money-bag-emoji.png"
                                    alt="Donation"
                                />
                            </div>
                            <div>
                                <h3 className="text-base font-medium text-slate-600">Easy Donations</h3>
                                <p className="text-sm text-slate-500">
                                    Quickly donate to campaigns with secure and simple payment methods.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                                <img
                                    src="https://img.icons8.com/emoji/48/000000/chart-increasing-emoji.png"
                                    alt="Transparency"
                                />
                            </div>
                            <div>
                                <h3 className="text-base font-medium text-slate-600">Transparent Tracking</h3>
                                <p className="text-sm text-slate-500">
                                    See exactly how your donations are used and the impact they create.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                                <img
                                    src="https://img.icons8.com/emoji/48/000000/handshake-emoji.png"
                                    alt="Community"
                                />
                            </div>
                            <div>
                                <h3 className="text-base font-medium text-slate-600">Join a Caring Community</h3>
                                <p className="text-sm text-slate-500">
                                    Connect with NGOs and fellow donors to support meaningful causes together.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default About