
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HowItWorks() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const steps = [
        {
            number: "1",
            title: "Sign Up",
            description: "Create your account as a donor or recipient in just a few minutes",
        },
        {
            number: "2",
            title: "Post or Request",
            description: "Donors post available food, recipients request what they need",
        },
        {
            number: "3",
            title: "Connect",
            description: "Our platform matches donors with recipients in their area",
        },
        {
            number: "4",
            title: "Share",
            description: "Coordinate pickup or delivery and share the meal with those in need",
        },
    ];

    return (
        <section id="how-it-works" className="how-it-works py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                <div className="section-title mb-12" data-aos="fade-up">
                    <h2 className="!text-5xl sm:text-4xl font-bold mb-4">How It Works</h2>
                    <p className="max-w-2xl mx-auto text-lg font-medium">
                        Simple steps to make a difference in your community
                    </p>
                </div>

                <div className="steps flex flex-wrap justify-center gap-8">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="step  w-full sm:w-[45%] md:w-[22%]"
                            data-aos="fade-up"
                            data-aos-delay={idx * 150}
                        >
                            <div className="step-number w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white text-xl font-bold mb-4 mx-auto">
                                {step.number}
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-700 text-md font-semibold">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
