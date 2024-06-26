import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown } from "react-icons/fa";
import { Menus, signOutAction } from '../utils/helper';
import { Link } from 'react-router-dom';
import { SlideUpOut } from '../animations';
import PropTypes from 'prop-types';

const UserProfileDetails = () => {
    const user = useSelector(state => state.user?.user);
    const [isMenu, setIsMenu] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsMenu(prevState => !prevState);
    }, []);

    return (
        <div className='flex items-center justify-center gap-4 relative'>
            <div className='w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500'>
                {user?.photoURL ? (
                    <motion.img 
                        whileHover={{ scale: 1.2 }} 
                        src={user?.photoURL} 
                        alt={user?.displayName} 
                        referrerPolicy='no-referrer' 
                        className='w-full h-full object-cover' 
                    />
                ) : (
                    <p className='text-xl text-white font-semibold capitalize'>
                        {user?.email[0]}
                    </p>
                )}
            </div>
            <motion.div 
                onClick={toggleMenu} 
                className='px-4 py-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer' 
                whileTap={{ scale: 0.9 }}
            >
                <FaChevronDown className='text-primaryText' />
            </motion.div>
            <AnimatePresence>
                {isMenu && (
                    <motion.div {...SlideUpOut} className='bg-secondary absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[225px]'>
                        {Menus.map(menu => (
                            <Link 
                                to={menu.uri} 
                                key={menu.id} 
                                className='text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md'
                            >
                                {menu.name}
                            </Link>
                        ))}
                        <motion.p
                            onClick={signOutAction}
                            whileTap={{ scale: 0.9 }}
                            className='text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md'
                        >
                            SignOut
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

UserProfileDetails.propTypes = {
    user: PropTypes.shape({
        photoURL: PropTypes.string,
        email: PropTypes.string,
        displayName: PropTypes.string,
    }),
};

export default UserProfileDetails;
