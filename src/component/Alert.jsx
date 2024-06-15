import React from 'react';
import { motion } from 'framer-motion';
import { SlideUpOut } from '../animations';

const Alert = ({ status, alertMsg }) => {
    const alertStyles = {
        Success: 'bg-emerald-400 shadow-emerald-500',
        Warning: 'bg-yellow-400 shadow-yellow-500',
        Danger: 'bg-red-400 shadow-red-500',
    };

    return (
        <motion.div { ...SlideUpOut } className='fixed top-24 right-12 z-10'>
            {alertStyles[status] && (
                <div className={`px-4 py-2 rounded-md shadow-md ${alertStyles[status]}`}>
                    <p className='text-lg text-primary'>{alertMsg}</p>
                </div>
            )}
        </motion.div>
    );
};

export default Alert;
