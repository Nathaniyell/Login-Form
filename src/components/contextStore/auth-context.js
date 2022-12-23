import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => {}
});
//As shown above, Always define the data you are passing and the functions as well if any
//This gives better IDE autocompletion

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=>{
        const loginInformation = localStorage.getItem('isLoggedIn')
        if (loginInformation === 'Yes'){
          setIsLoggedIn(true)
        }
      }, [])

    const loginHandler=()=>{
        localStorage.setItem('isLoggedIn', 'Yes') 
        // once the user LoggsIn, the storage information is set and saved automatically
        setIsLoggedIn(true);
    }
    const logoutHandler=()=>{
        localStorage.removeItem('isLoggedIn') //This clears the storage information once the user loggs-Out
        setIsLoggedIn(false);
    }
    return (
        <AuthContext.Provider value={{
            isLoggedIn:isLoggedIn,
            onLogin: loginHandler,
            onLogout: logoutHandler
        }}>
            {props.children}
        </AuthContext.Provider>

        //The AuthContextProvider will be used to wrap the App component in Index.js
    )
}



export default AuthContext