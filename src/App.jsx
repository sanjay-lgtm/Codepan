import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setUserNull } from './context/actions/useractions';
import { auth, db } from './config/firebase.config';
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Home, NewProject } from './container';
import { Spinner } from './component';
import './App.css';
import { setProjects } from './context/actions/projectactions'; // Ensure the correct import path
import CodePen from './container/Codepan';

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userCred) => {
      setIsLoading(true);
      if (userCred) {
        console.log(userCred?.providerData[0].email);
        try {
          await setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]);
          dispatch(setUser(userCred?.providerData[0]));
          navigate("/home/projects", { replace: true });
        } catch (error) {
          console.error("Error setting user document: ", error);
        }
      } else {
        dispatch(setUserNull());
        navigate("/home/auth", { replace: true });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, dispatch]);

  useEffect(() => {
    const projectQuery = query(
      collection(db, "Projects"),
      orderBy("id", "desc")
    );
    const unsubscribe = onSnapshot(projectQuery, (querySnapshot) => {
      const projectList = querySnapshot.docs.map((doc) => doc.data());
      dispatch(setProjects(projectList)); // Use the correct dispatch function
    });
    return () => unsubscribe(); // Ensure cleanup
  }, [dispatch]);

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
            <Route path='/home/newProject' element={<NewProject />} />
            <Route path='*' element={<Navigate to="/home" />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
