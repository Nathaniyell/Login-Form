import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';


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
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
