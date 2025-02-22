export const oidcConfig = {
  authority: "http://localhost:4000/realms/HMS",
  client_id: "my-client-id",
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
