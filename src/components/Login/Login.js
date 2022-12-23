import React, { useState, useEffect, useReducer, useContext, useRef } from "react";
import AuthContext from '../contextStore/auth-context'
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const emailReducerFn = (state, action) => {
 
  let emailValue;
  switch (action.type) {
    case "USER_INPUT":
      emailValue = { value: action.val, isValid: action.val.includes("@") };
      break;
    case "INPUT_BLUR":
      emailValue = { value: state.value, isValid: state.value.includes("@") };
      break;
    default:
      return { value: "", isValid: false };
  }
  return emailValue;
};

const passwordReducerFn = (state, action) => {
  let passwordValue;
  switch (action.type) {
    case "PASSWORD_INPUT":
      passwordValue = {
        value: action.value,
        isValid: action.val.trim().length > 6,
      };
      break;
    case "PASSWORD_BLUR":
      passwordValue = {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };
      break;
    default:
      return { value: "", isValid: false };
  }
  return passwordValue;
};

const Login = () => {
  const loginContext = useContext(AuthContext)
  const [formIsValid, setFormIsValid] = useState(null);
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  //const [state, dispatchFn] = useReducer(reducerFn, initialState)
  const [emailState, dispatchEmail] = useReducer(emailReducerFn, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducerFn, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  /*pulling the isValid property from the emailState/ Object and also assigning it to a newValue
  the above can be termed object destructuring and assigning an Alias which can later be used */

  /*The advantage of doing this is so that whenever just the value changes and the validity didn't change,
  the use effect will not be re-run*/

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500); //This ensures that the validation is only run after 5secs and not on every keyStroke
    return () => {
      clearTimeout(identifier);
      /*The return statement is used as a cleanUp for the useEffect
      It runs before every new useEffect function is run.
      */
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value }); //we use this line to update the value
      };

      const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" });
        // setEmailIsValid(emailState.isValid);
      };

  const passwordChangeHandler = (event) => {
   
    dispatchPassword({ type: "PASSWORD_INPUT", val: event.target.value });


  };

  const validatePasswordHandler = () => {
    dispatchEmail({ type: "PASSWORD_BLUR" });

    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      loginContext.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
      emailInputRef.current.focus() //This focuses the input field that is making the form invalid
    } else{
          passwordInputRef.current.focus()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
       <Input 
       ref={emailInputRef}
       id='email'
       label="E-mail"
       type="email"
       value={emailState.value}
       isValid={emailIsValid}
       onChange={ emailChangeHandler}
       onBlur={validateEmailHandler}
       />
       <Input 
       ref={passwordInputRef}
       id='password'
       label="Password"
       type="password"
       value={passwordState.value}
       isValid={passwordIsValid}
       onChange={passwordChangeHandler}
       onBlur={validatePasswordHandler}
       />
       
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
