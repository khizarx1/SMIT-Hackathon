import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { whiteSpinner } from "../../components/WhiteSpinner";
import axios from "axios";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profileImage: null,
    role: "donor", // default role
};

function Register() {
    const formData = [
        { type: "text", placeholder: "Enter FirstName", name: "firstName" },
        { type: "text", placeholder: "Enter LastName", name: "lastName" },
        { type: "email", placeholder: "Enter Email", name: "email" },
        { type: "password", placeholder: "Enter Password", name: "password" },
    ];

    const navigate = useNavigate();
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
    const handleFileChange = (e) => {
        setState({ ...state, profileImage: e.target.files[0] });
    };

    const validation = () => {
        if (
            !state.firstName ||
            !state.lastName ||
            !state.email ||
            !state.password ||
            !state.role
        ) {
            toast.error("All fields are required!");
            setIsProcessing(false);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validation()) return;
        setIsProcessing(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append(
                "fullName",
                `${state.firstName} ${state.lastName}`.trim()
            );
            formDataToSend.append("email", state.email);
            formDataToSend.append("password", state.password);
            formDataToSend.append("role", state.role);

            if (state.profileImage)
                formDataToSend.append("profileImage", state.profileImage);

            const res = await axios.post(
                "http://localhost:5000/api/users/register",
                formDataToSend,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            const token = res?.data?.data?.token;
            if (token) localStorage.setItem("accessToken", token);

            toast.success(res?.data?.message || "User registered successfully");
            navigate("/authentication/login");
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
                <h1 className="pb-2 text-3xl text-center font-bold">Register Form</h1>
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

                    {/* Role dropdown */}
                    <select
                        name="role"
                        value={state.role}
                        onChange={handleChange}
                        className="col-span-1 md:col-span-2 p-2 rounded-lg border border-slate-400"
                    >
                        <option value="ngo">NGO</option>
                        <option value="donor">Donor</option>
                    </select>

                    {/* File input */}
                    <label className="col-span-1 md:col-span-2">
                        Profile Photo
                        <input
                            type="file"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-2 rounded-lg border border-slate-400"
                        />
                    </label>

                    {/* Submit button */}
                    <button className="col-span-1 md:col-span-2 py-2 mt-2 rounded-lg bg-green-700 hover:bg-green-900 text-white cursor-pointer">
                        {!isProcessing ? "Register" : <Spin indicator={whiteSpinner} />}
                    </button>

                    <div className="flex gap-5 text-sm col-span-1 md:col-span-2 mt-2">
                        <p>Already have an account?</p>
                        <Link to="/authentication/login" className="underline">
                            Login
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;
