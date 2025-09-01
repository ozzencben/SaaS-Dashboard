import "./App.css";
import { AuthProvider } from "./context/auth/AuthProvider";
import AppRoute from "./navigation/Router";

function App() {
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  );
}

export default App;
