import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed in as ${authUser.email}`}</p>
          <button type="button" onClick={() => signOut(auth)}>
            Logout
          </button>
        </>
      ) : (
        
          <p>{authUser === null && <Link to="/signin">Signin</Link>}</p>
      
      )}
    </div>
  );
};

export default AuthDetails;
