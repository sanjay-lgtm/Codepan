import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from 'framer-motion';

const UserAuthInput = ({ label, placeHolder, isPass, setStateFunction, Icon, setGetEmailValidationState }) => {
    const [value, setValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        setStateFunction(newValue);

        if (placeHolder === "Email") {
            const emailRegex = /.+@[^@]+\.[^@]{2,}$/;
            const status = emailRegex.test(newValue);
            setIsEmailValid(status);
            setGetEmailValidationState(status);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex flex-col items-start justify-start gap-1'>
            <label className='text-sm text-gray-300'>{label}</label>
            <div className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${!isEmailValid && placeHolder === "Email" && value.length > 0 ? "border-2 border-red-500" : ""}`}>
                <Icon className='text-text555 text-2xl' />
                <input
                    type={isPass && !showPassword ? "password" : "text"}
                    placeholder={placeHolder}
                    className='flex-1 w-full h-full outline-none border-none bg-transparent text-text555 text-lg'
                    value={value}
                    onChange={handleInputChange}
                />
                {isPass && (
                    <motion.div whileTap={{ scale: 0.9 }} className='cursor-pointer' onClick={toggleShowPassword}>
                        {showPassword ? (
                            <FaEyeSlash className='text-text555 text-2xl cursor-pointer' />
                        ) : (
                            <FaEye className='text-text555 text-2xl cursor-pointer' />
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default UserAuthInput;
