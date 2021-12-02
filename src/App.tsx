import React from "react";
import Routes from "./routes/routes";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { loggedIn } = useAuth();

  return <Routes loggedIn={loggedIn} />;
}

export default App;
