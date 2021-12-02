import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

interface useAuthProps {
  login: any;
  logout: any;
  loggedIn: boolean;
}

interface userProps {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

const AuthContext = createContext<any>({});

const AuthProvider: React.FC = (props) => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("userGestaoEValor");
    return user != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [loggedIn]);

  const login = (user: userProps) => {
    localStorage.setItem(
      "userGestaoEValor",
      JSON.stringify({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
    );

    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("userGestaoEValor");
    setLoggedIn(false);
    // history.push("/login");
  };

  const authContextValue = {
    login,
    loggedIn,
    logout,
  };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext<useAuthProps>(AuthContext);

const User = () => {
  const userData = JSON.parse(localStorage.getItem("userGestaoEValor") || "");
  return userData;
};

export { AuthProvider, User, useAuth };
