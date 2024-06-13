import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setUserNull } from './context/actions/useractions';
import { auth, db } from './config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './container';
import { Spinner } from './component';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userCred => {
      if (userCred) {
        console.log(userCred?.providerData[0].email);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0])
          .then(() => {
            dispatch(setUser(userCred?.providerData[0]));
            navigate("/home/projects",{replace:true})
          })
          .catch(error => {
            console.error("Error setting user document: ", error);
          });
      } else {
        dispatch(setUserNull());
        navigate("/home/auth", { replace: true });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });

    return () => unsubscribe();
  }, [navigate, dispatch]);

  return (
    <>
      {isLoading ? (
        <div className='w-screen h-screen flex items-center justify-center overflow-hidden'>
          <Spinner />
        </div>
      ) : (
        <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
          <Routes>
            <Route path='/home/*' element={<Home />} />
            <Route path='*' element={<Navigate to="/home" />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
