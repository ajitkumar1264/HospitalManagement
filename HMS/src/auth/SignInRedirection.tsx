import { useLayoutEffect, useState } from "react";
import { hasAuthParams, useAuth } from "react-oidc-context";

function SignInRedirection() {
  const auth = useAuth();

  console.log(auth)
  const [isFirstSignIn, setisFirstSignIn] = useState(true);
  
  const needSignIn = !hasAuthParams() &&
    !auth.isLoading &&
    !auth.isAuthenticated &&
    !auth.activeNavigator;
  
  useLayoutEffect(() => {
    if (auth.isAuthenticated)
    {
      setisFirstSignIn(false);
    }
  })

  const redirectLogin = async() => {
    
    await auth.signinRedirect();
  }
  
  useLayoutEffect(() => {
    if (needSignIn && isFirstSignIn) {
      redirectLogin()
    }
  }, [needSignIn,auth.signinRedirect,isFirstSignIn]);

  return null;
}

export default SignInRedirection;
