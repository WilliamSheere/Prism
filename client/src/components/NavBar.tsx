import "../styles/NavBar.css"
import { useContext, useEffect } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import Auth from "../utils/auth";
import { NavLink } from "react-router-dom";
import Logo from "../assets/prism-logo.png"

const NavBar = () => {
   const { isLoggedIn } = useContext(AuthContext);
useEffect(() => {
  console.log(isLoggedIn)

}, [isLoggedIn])

  return (
		<nav>
			<div>
				<img src={Logo} alt="logo" id="logo" />
			</div>
			<div className="navLinks">
				{isLoggedIn ? (
					<>
						<NavLink to="/Dashboard">Dashboard</NavLink>
						<NavLink to="/Profile">Profile</NavLink>
						<div onClick={() => Auth.logout()}>Logout</div>
					</>
				) : (
					<>
						<NavLink to="/SignUp">Sign Up</NavLink>
						<NavLink to="/Login">Login</NavLink>
					</>
				)}
			</div>
		</nav>
	);
}

export default NavBar