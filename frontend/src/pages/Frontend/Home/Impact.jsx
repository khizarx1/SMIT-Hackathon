import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Impact() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const stats = [
        { number: "72B", label: "Pounds of Food Donated Annually" },
        { number: "1M+", label: "People Fed" },
        { number: "50%", label: "Reduction in Food Waste" },
        { number: "24/7", label: "Support Available" },
    ];

    return (
        <section id="impact" className="impact py-16 bg-black">
            <div className="container mx-auto px-4 text-center text-white">
                <div className="section-title mb-12" data-aos="fade-up">
                    <h2 className="!text-5xl sm:text-4xl font-bold mb-4">Our Impact</h2>
                    <p className="max-w-2xl mx-auto text-shadow-md">
                        Together, we're making a real difference in fighting hunger and reducing food waste
                    </p>
                </div>

                <div className="impact-stats flex flex-wrap justify-center gap-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="impact-stat" data-aos="fade-up" data-aos-delay={idx * 100}>
                            <div className="impact-number text-4xl sm:text-5xl font-bold mb-2">
                                {stat.number}
                            </div>
                            <div className="impact-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}