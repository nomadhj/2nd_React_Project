import { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({
  user: {},
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const logIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const stateChange = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    return () => {
      stateChange();
    };
  }, []);

  const authContext = {
    user,
    isLoggedIn: !!user?.accessToken,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
