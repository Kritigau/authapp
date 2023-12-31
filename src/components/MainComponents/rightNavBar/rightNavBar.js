import React, { useState } from "react"
import "./rightNavBar.css"
import { NavLink, useLocation } from "react-router-dom"

export default function RightNavBar() {
    const href = useLocation();

    const [rightNavBarBtnOn, setrightNavBarBtnOn] = useState(false)
    const rightNavBarMobileButton = () => {
        setrightNavBarBtnOn(() => !rightNavBarBtnOn)
    }

    let rightNavBar; // for rendering rightNavBar elements
    const isAuth = localStorage.getItem("bhaagB**") && localStorage.getItem("userId");

    const logOutButton = () => {
        localStorage.removeItem("bhaagB**");
        localStorage.removeItem("userId");
        localStorage.removeItem("expiryDatelodu");
    }

    if (isAuth) {
        rightNavBar =
            <>
                <a
                    onClick={logOutButton}
                    className="navlink glassmorphism"
                    href={href.pathname}
                >
                    LogOut
                </a>
            </>
    } else {
        rightNavBar =
            <>
                <NavLink
                    activeClassName="navlinkActive"
                    className="navlink glassmorphism"
                    to="/user/login"
                >
                    LogIn
                </NavLink>
                <NavLink
                    activeClassName="navlinkActive"
                    className="navlink glassmorphism"
                    to="/user/signup"
                >
                    SignUp
                </NavLink>
            </>
    }
    
    return (
        <div>
            <span
                onClick={rightNavBarMobileButton}
                className={rightNavBarBtnOn ? "rightNavBarMobileButton navlinkContainerOn" : "rightNavBarMobileButton"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" /></svg>
            </span>
            <div
                className="navlinkContainerMobile"
                style={rightNavBarBtnOn ? { transform: "rotateX(0deg)" } : { transform: "rotateX(90deg)" }}
                onClick={rightNavBarMobileButton}
            >
                {rightNavBar}
            </div>
            <div className="navlinkContainerPC">
                {/* {avtar} */}
                {rightNavBar}
            </div>
        </div>
    )
}