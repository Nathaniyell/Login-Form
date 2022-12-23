import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/contextStore/auth-context'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(()=>{
  const loginInformation = localStorage.getItem('isLoggedIn')
  if (loginInformation === 'Yes'){
    setIsLoggedIn(true)
  }
}, [])
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', 'Yes') // once the user LoggsIn, the storage information is set and saved automatically
      setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn') //This clears the storage information once the user loggs-Out
    setIsLoggedIn(false);
  };

  return (
         <AuthContext.Provider value={{
          isLoggedIn: isLoggedIn,
          onLogout: logoutHandler //we provide the logouthandler function which can also be accessed by any other compponent that needs it
         }}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>
   
  );
}

export default App;
