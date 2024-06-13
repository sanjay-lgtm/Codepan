import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './container';
import { useEffect, useState } from 'react';
import { auth, db } from './config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { Spinner } from './component';

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userCred => {
      if (userCred) {
        console.log(userCred?.providerData[0].email);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(() => {

        })
      } else {
        navigate("/home/auth", { replace: true });
      }
      setInterval(() => {
        setIsLoading(false)
      }, 2000)
    });

    return () => unsubscribe();
  }, [navigate]);


  return (
    <>
      { isLoading ? (
        <div className='w-screen h-screen flex items-center justify-center overflow-hidden'>
          <Spinner />
        </div>
      ) : (
        <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
          <Routes>
            <Route path='/home/*' element={ <Home /> } />
            <Route path='*' element={ <Navigate to="/home" /> } />
          </Routes>
        </div>
      ) }
    </>
  );
}

export default App;
