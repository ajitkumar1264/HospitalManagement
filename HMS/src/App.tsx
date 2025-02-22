import { AuthProvider } from "react-oidc-context";
import "./App.css";
import { oidcConfig } from "./config/AuthConfig";
import AppRoutes from "./Routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import SignInRedirection from "./auth/SignInRedirection";

function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <BrowserRouter>
        <SignInRedirection />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
