import "../styles/NavBar.css"
import { useContext, useEffect } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import Auth from "../utils/auth";

const NavBar = () => {
   const { isLoggedIn } = useContext(AuthContext);
useEffect(() => {
  console.log(isLoggedIn)

}, [isLoggedIn])

  return (
    <nav>
      <button onClick={()=>Auth.logout()}>

        Logout 
      </button>
    </nav>
  )
}

export default NavBar