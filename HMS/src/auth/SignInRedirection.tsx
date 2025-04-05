import { useCallback, useLayoutEffect, useState } from "react";
import { hasAuthParams, useAuth } from "react-oidc-context";

function SignInRedirection() {
  const auth = useAuth();

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
  },[auth.isAuthenticated])

  const redirectLogin = useCallback(async () => {
    await auth.signinRedirect();
  }, [auth]);
  
  useLayoutEffect(() => {
    if (needSignIn && isFirstSignIn) {
      redirectLogin()
    }
  }, [needSignIn,auth.signinRedirect,isFirstSignIn,redirectLogin]);

  return null;
}

export default SignInRedirection;
