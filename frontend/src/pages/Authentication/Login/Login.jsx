import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Spin } from "antd";
import { whiteSpinner } from "../../components/WhiteSpinner";

const initialState = { email: "", password: "" };

function Login() {
    const formData = [
        { type: "email", placeholder: "Enter Email", name: "email" },
        { type: "password", placeholder: "Enter Password", name: "password" },
    ];

    const navigate = useNavigate();
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        if (!state.email || !state.password) {
            toast.error("Both email and password are required");
            setIsProcessing(false);
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/users/login",
                { email: state.email, password: state.password },
                {
                    headers: {
                        "Content-Type": "application/json", // ✅ explicitly tell backend it's JSON
                    },
                    withCredentials: true,
                }
            );

            const token = res.data?.data?.token;
            const user = res.data?.data?.user;

            if (token) localStorage.setItem("accessToken", token);
            if (user) localStorage.setItem("user", JSON.stringify(user));

            toast.success(res.data?.message || "Login successful");

            setState(initialState);

            // ✅ Redirect based on role
            switch (user?.role) {
                case "ngo":
                    navigate("/Dashboard/NGODashboard");
                    break;
                case "donor":
                    navigate("/Dashboard/DONORDashboard");
                    break;
                default:
                    navigate("/"); // fallback
            }

        } catch (error) {
            const errMsg =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong";
            toast.error(errMsg);
            console.log(errMsg);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className=" w-[90%] md:w-[600px] p-4 rounded-lg shadow-xl"
            >
                <h1 className="pb-2 text-3xl text-center font-bold">Login Form</h1>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    {formData.map((item, idx) => (
                        <input
                            key={idx}
                            className="p-2 rounded-lg border border-slate-400"
                            type={item.type}
                            placeholder={item.placeholder}
                            name={item.name}
                            onChange={handleChange}
                        />
                    ))}

                    <button className="col-span-1 md:col-span-2 py-2 mt-2 rounded-lg bg-green-700 hover:bg-green-900 text-white cursor-pointer">
                        {!isProcessing ? "Login" : <Spin indicator={whiteSpinner} />}
                    </button>

                    <div className="flex gap-5 text-sm col-span-1 md:col-span-2 mt-2">
                        <p>Don’t have an account?</p>
                        <Link to="/authentication/register" className="underline">
                            Register
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
