import React, { useState } from 'react';
import Logo from '../assets/Logo.webp'; // Ensure correct import path and file extension
import { UserAuthInput } from '../component';
import { FaEnvelope } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import { motion } from 'framer-motion';
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [getEmailValidationState, setGetEmailValidationState] = useState(false)

    const [isLogin, setIsLogin] = useState(false)
    return (
        <div className='w-full py-6'>
            <img src={ Logo } alt='Logo' className='object-contain w-32 h-auto opacity-90' />

            <div className='w-full flex flex-col items-center justify-center py-8'><p className='py-12 text-2xl text-primaryText'>Join With Us! 😊</p>
                <div className='px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8'>

                    {/* email */ }
                    <UserAuthInput label="Email" placeHolder="Email" isPass={ false } key="Email" setStateFunction={ setEmail } Icon={ FaEnvelope } setGetEmailValidationState={ setGetEmailValidationState } />

                    {/* password */ }
                    <UserAuthInput label="Password" placeHolder="********" isPass={ true } key="Password" setStateFunction={ setPassword } Icon={ MdPassword } />

                    {/* alert section  */ }

                    {/* login button  */ }
                    { !isLogin ? (<motion.div
                        whileTap={ { scale: 0.9 } }
                        className='flex items-center justify-center w-full py-3 rounded-md bg-emerald-500    text-white  cursor-pointer hover:bg-emerald-700'>
                        <p className='text-xl text-white'>SignUp</p>
                    </motion.div>) : (
                        <motion.div
                            whileTap={ { scale: 0.9 } }
                            className='flex items-center justify-center w-full py-3 rounded-md bg-emerald-500    text-white  cursor-pointer hover:bg-emerald-700'>
                            <p className='text-xl text-white'>Login</p>
                        </motion.div>
                    ) }
                    {/* text  */ }
                   {!isLogin ?(
                     <p className='text-sm text-primaryText flex items-center justify-center gap-1'>Already have an account ! <span onClick={() => setIsLogin(!isLogin)} className='text-emerald-500 gap-8'>LogIn here</span></p>
                   ):(
                    <p className='text-sm text-primaryText flex items-center justify-center gap-1'>Does't have an account ! <span  onClick={() => setIsLogin(!isLogin)}  className='text-emerald-500 gap-8'>Create here</span></p>
                   )}
                    {/* or  */ }
                   <div className='flex items-center justify-center gap-12'>
                   <div className='h-[1px] bg-primaryText rounded-md w-24'></div>
                   <p className='text-sm text-primaryText'>OR</p>
                   <div className='h-[1px] bg-primaryText rounded-md w-24'></div>
                   </div>
                    {/* google signin  */ }
                   <motion.div whileTap={{scale:0.9}}>
                   <FcGoogle />

                   </motion.div>

                    {/* or  */ }
                    <div className='flex items-center justify-center gap-12'>
                   <div className='h-[1px] bg-primaryText rounded-md w-24'></div>
                   <p className='text-sm text-primaryText'>OR</p>
                   <div className='h-[1px] bg-primaryText rounded-md w-24'></div>
                   </div>

                    {/* github */ }
                </div>

            </div>
        </div>
    );
};

export default SignUp;
