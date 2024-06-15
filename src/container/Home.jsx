import React, { useState, useMemo } from 'react';
import { HiChevronDoubleLeft } from "react-icons/hi";
import { motion } from 'framer-motion';
import { Link, Route, Routes } from 'react-router-dom';
import Logo from '../assets/Logo.webp';
import { MdHome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Project, SignUp } from '../container';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileDetails } from '../component';
import { setSearch } from '../context/actions/searchactions';

const Sidebar = ({ isSideMenu, toggleSideMenu }) => (
    <div className={`transition-all duration-200 ease-in-out ${isSideMenu ? "w-16" : "w-64"} bg-secondary min-h-screen flex flex-col items-center px-3 py-6`}>
      

        <Link to="/home" className={`transition-all duration-200 ${isSideMenu ? "hidden" : "block"}`}>
            <img src={Logo} alt="logo" className="w-40 h-auto object-contain" />
        </Link>

        <div className="mt-10 w-full flex flex-col items-center gap-6">
            <Link to="/home/newProject" className="w-full">
                <div className="px-4 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer hover:border-gray-200">
                    <p className="text-gray-400 hover:text-gray-200 capitalize">Start Coding</p>
                </div>
            </Link>

            <Link to="/home/projects" className={`flex items-center gap-4 ${isSideMenu ? "justify-center" : "justify-start"} w-full`}>
                <MdHome className="text-primaryText text-xl" />
                {!isSideMenu && <p className="text-lg text-primaryText">Home</p>}
            </Link>
        </div>
        <motion.div 
            whileTap={{ scale: 0.9 }} 
            onClick={toggleSideMenu} 
            className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer"
        >
            <HiChevronDoubleLeft className="text-white text-xl" />
        </motion.div>
    </div>
);

const Home = () => {
    const [isSideMenu, setSideMenu] = useState(false);
    const user = useSelector(state => state.user?.user);
    const searchTerm = useSelector(state => state.searchTerm?.searchTerm || "");
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        dispatch(setSearch(e.target.value));
    };

    const memoizedSearchTerm = useMemo(() => searchTerm, [searchTerm]);

    return (
        <div className="flex w-full overflow-hidden">
            <Sidebar isSideMenu={isSideMenu} toggleSideMenu={() => setSideMenu(!isSideMenu)} />

            <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll px-4 md:px-12 py-4 md:py-12">
                <div className="w-full flex items-center justify-between gap-3">
                    <div className="bg-secondary w-full px-4 py-3 rounded-md flex items-center gap-3">
                        <FaSearch className="text-2xl text-primaryText" />
                        <input 
                            type="text" 
                            value={memoizedSearchTerm}
                            className="flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600" 
                            placeholder="Search here..." 
                            onChange={handleSearchChange}
                        />
                    </div>

                    {user ? (
                        <UserProfileDetails />
                    ) : (
                        <motion.div whileTap={{ scale: 0.9 }} className="flex items-center">
                            <Link to="/home/auth" className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700">
                                SignUp
                            </Link>
                        </motion.div>
                    )}
                </div>

                <div className="w-full mt-6">
                    <Routes>
                        <Route path="/*" element={<Project />} />
                        <Route path="/auth" element={<SignUp />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Home;
