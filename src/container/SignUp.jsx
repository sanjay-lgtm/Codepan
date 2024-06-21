import React, { useState } from 'react';
import Logo from '../assets/Logo.webp'; // Ensure correct import path and file extension
import { FaEnvelope, FaGithub } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { FcGoogle } from "react-icons/fc";
import { signInWithGitHub, signInWithGoogle } from '../utils/helper';
import { auth } from '../config/firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import UserAuthInput from '../component/UserAuthInput';
import { fadeInOut } from '../animations';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationState, setGetEmailValidationState] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const navigate = useNavigate();
  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasNumber.test(password)) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar.test(password)) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const handleAuthAction = async (redirect) => {
    setAlert(false); // Clear previous alerts
    const passwordError = validatePassword(password);
    if (!getEmailValidationState) {
      setAlertMsg("Invalid email format");
      setAlert(true);
    } else if (passwordError) {
      setAlertMsg(passwordError);
      setAlert(true);
    } else {
      try {
        if (isLogin) {
          const userCred = await signInWithEmailAndPassword(auth, email, password);
          console.log(userCred);
        } else {
          const userCred = await createUserWithEmailAndPassword(auth, email, password);
          console.log(userCred);
        }
        redirect()
      } catch (error) {
        setAlertMsg(error.message);
        setAlert(true);
        console.error(error);
      }
    }
  };

  return (
    <div className='w-full py-6 flex flex-col items-center'>
      <div className='flex justify-center mb-4'>
        <img src={Logo} alt='Logo' className='object-contain w-32 h-auto opacity-90' />
      </div>

      <div className='w-full max-w-md flex flex-col items-center justify-center py-8'>
        <p className='py-4 text-2xl text-primaryText'>Join With Us! 😊</p>
        <div className='px-8 w-full py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8'>

          {/* Email Input */}
          <UserAuthInput
            label="Email"
            placeHolder="Email"
            isPass={false}
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setGetEmailValidationState={setGetEmailValidationState}
          />

          {/* Password Input */}
          <UserAuthInput
            label="Password"
            placeHolder="********"
            isPass={true}
            setStateFunction={setPassword}
            Icon={MdLock}
          />

          {/* Alert Message */}
          <AnimatePresence>
            {alert && (
              <motion.p key={"AlertMessage"} {...fadeInOut} className='text-red-500'>
                {alertMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Auth Button */}
          <motion.div
            onClick={()=>handleAuthAction(navigate("home",{replace:true}))}
            whileTap={{ scale: 0.9 }}
            className='flex items-center justify-center w-full py-3 rounded-md bg-emerald-500 text-white cursor-pointer hover:bg-emerald-700'
          >
            <p className='text-xl text-white'>{isLogin ? 'Login' : 'Sign Up'}</p>
          </motion.div>

          {/* Toggle Login/Signup */}
          <p className='text-sm text-primaryText flex items-center justify-center gap-1'>
            {isLogin ? (
              <>
                Don't have an account?
                <span onClick={() => setIsLogin(false)} className='text-emerald-500 cursor-pointer'>Create here</span>
              </>
            ) : (
              <>
                Already have an account?
                <span onClick={() => setIsLogin(true)} className='text-emerald-500 cursor-pointer'>Log In here</span>
              </>
            )}
          </p>

          {/* Separator */}
          <div className='flex items-center justify-center gap-12'>
            <div className='h-[1px] bg-primaryText rounded-md w-24'></div>
            <p className='text-sm text-primaryText'>OR</p>
            <div className='h-[1px] bg-primaryText rounded-md w-24'></div>
          </div>

          {/* Google Sign-in */}
          <motion.div
            onClick={()=>signInWithGoogle(navigate("home",{replace:true}))}
            className='flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-1 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer'
            whileTap={{ scale: 0.9 }}
          >
            <FcGoogle className='text-3xl' />
            <p className='text-xl text-white'>Sign In with Google</p>
          </motion.div>

          {/* Separator */}
          <div className='flex items-center justify-center gap-12'>
            <div className='h-[1px] bg-primaryText rounded-md w-24'></div>
            <p className='text-sm text-primaryText'>OR</p>
            <div className='h-[1px] bg-primaryText rounded-md w-24'></div>
          </div>

          {/* GitHub Sign-in */}
          <motion.div
            onClick={()=>signInWithGitHub(navigate("home",{replace:true}))}
            className='flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-1 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer'
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className='text-3xl' />
            <p className='text-xl text-white'>Sign In with GitHub</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
