export const oidcConfig = {
  authority: "http://localhost:4000/realms/myrealm",
  client_id: "react-app",
  redirect_uri: "http://localhost:5173/home",
  post_logout_redirect_uri: "http://localhost:5173/login",
  onSigninCallback: () => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  }
}
