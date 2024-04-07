import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

function LoginButton () {
  const { user,loginWithRedirect } = useAuth0();

  return ( 
 
    <button onClick={(e)=> loginWithRedirect}>Log In</button>
    
  );
}

export default LoginButton;