import React, { useEffect, useReducer, useRef, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const emailReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "ON_BLUR") {
    return { value: prevState.value, isValid: prevState.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "ON_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 6,
    };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredEmail, dispatchEnteredEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [enteredPassword, dispatchEnteredPassword] = useReducer(
    passwordReducer,
    {
      value: "",
      isValid: null,
    }
  );
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const { isValid: emailIsValid } = enteredEmail;
  const { isValid: passwordIsValid } = enteredPassword;
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Check!!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("CLEANUP!");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
  const emailChangeHandler = (event) => {
    dispatchEnteredEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(event.target.value.includes("@") && enteredPassword.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchEnteredPassword({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   enteredEmail.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEnteredEmail({ type: "ON_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchEnteredPassword({ type: "ON_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) props.onLogin(enteredEmail.value, enteredPassword.value);
    else if (!emailIsValid) emailInputRef.current.focus();
    else passwordInputRef.current.focus();
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          value={enteredEmail.value}
          isValid={emailIsValid}
          onClick={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          value={enteredPassword.value}
          isValid={passwordIsValid}
          onClick={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
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
