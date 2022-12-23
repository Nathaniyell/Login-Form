import React, {createContext} from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: ()=>{}
})

//As shown above, Always define the data you are passing and the functions as well if any
//This gives better IDE autocompletion

export default AuthContext