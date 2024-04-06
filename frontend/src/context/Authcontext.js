import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (phone) => {
    const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
      size:'invisible',
    });
    return signInWithPhoneNumber(auth, phone, recaptcha);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
