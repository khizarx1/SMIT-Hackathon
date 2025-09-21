import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext';

function Navbar() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("accessToken"); // remove JWT
            setUser(null); // update context -> triggers Navbar re-render
            navigate("/Authentication/Login"); // redirect to login
        }
    };

    // Dynamic dashboard link based on role
    const dashboardLink = user?.role === "ngo"
        ? "/Dashboard/NGODashboard"
        : "/Dashboard/DONORDashboard";

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: dashboardLink }, // ✅ dynamic
        { name: 'Campaign', path: '/Dashboard/Campaign' },
    ];

    const ref = React.useRef(null)
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(ref.current?.scrollTop > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 bg-black w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>
            <div className={`font-bold text-2xl ${isScrolled ? "text-gray-700" : "text-white"}`}>Donation Hub</div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </Link>
                ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4">
                {!user ? (
                    <Link to={'/Authentication/Login'} className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}>
                        Login
                    </Link>
                ) : (
                    <button
                        onClick={handleLogout}
                        className={`px-6 py-2.5 cursor-pointer rounded-full ml-4 transition-all duration-500 bg-red-600 text-white hover:bg-red-700`}
                    >
                        Logout
                    </button>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                {!user ? (
                    <Link to={'/Authentication/Login'} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Login
                    </Link>
                ) : (
                    <button
                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                        className="bg-red-600 cursor-pointer text-white px-8 py-2.5 rounded-full transition-all duration-500 hover:bg-red-700"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar
