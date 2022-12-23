import React, { useContext } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/contextStore/auth-context'


function App() {
  const cntxt = useContext(AuthContext)




  return (
    <>
      <MainHeader />
      <main>
        {!cntxt.isLoggedIn && <Login />}
        {cntxt.isLoggedIn && <Home />}
      </main>
    </>

  );
}

export default App;
