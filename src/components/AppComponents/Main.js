import React, { useEffect } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import RightNavBar from "../MainComponents/rightNavBar/rightNavBar"
import Error from "../CommonToAll/Error"
import LogIn from "../MainComponents/rightNavBar/auth/LogIn"
import SignUp from "../MainComponents/rightNavBar/auth/signUp"

export default function Main() {
  const logOut = () => {
    localStorage.removeItem("bhaagB**");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDatelodu");
  }
  const setAutoLogOut = (remainingMilliSec) => {
    setTimeout(() => {
      logOut();
      window.location.replace("/")
    }, remainingMilliSec)
  }

  const useEffectFinalArgument = false; // find its permanent solution and remove it.
  useEffect(() => {
    const expiryDate = localStorage.getItem("expiryDatelodu");
    if (!window.$IsAuth || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logOut();
      return;
    }
    const remainingMilliSec = new Date(expiryDate).getTime() - new Date().getTime();
    setAutoLogOut(remainingMilliSec);
  }, [useEffectFinalArgument])

  return (
    <>
      <RightNavBar />
      <Switch>
        <Route path="/" component={LogIn} exact />
        <Route path="/user/login">
          {window.$IsAuth ? <Redirect to="/" /> : <LogIn previousLocation="/user/profilePage" />}
        </Route>
        <Route path="/user/signup">
          {window.$IsAuth ? <Redirect to="/" /> : <SignUp previousLocation="/user/profilePage" />}
        </Route>
        <Route component={Error} />
      </Switch>
    </>
  )
}