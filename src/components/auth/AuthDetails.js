// import React, { useState, useEffect } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import {useDispatch} from 'react-redux'
// import { Link } from "react-router-dom";
// import { auth } from "../../firebase";
// import { setLoggedInUser } from '../../features/usersJourney/UserSlice'

// const AuthDetails = () => {
//   const [authUser, setAuthUser] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const listen = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setAuthUser(user);
//         console.log(user.email)
//         dispatch(setLoggedInUser(user))
//       } else {
//         setAuthUser(null);
//       }
//     });
//     return () => {
//       listen();
//     };
//   }, [dispatch]);
//   return (
//     <div>
//       {authUser ? (
//         <>
//           <p>{`Signed in as ${authUser.email}`}</p>
//           <button type="button" onClick={() => signOut(auth)}>
//             Logout
//           </button>
//         </>
//       ) : (
        
//           <p>{authUser === null && <Link to="/signin">Signin</Link>}</p>
      
//       )}
//     </div>
//   );
// };

// export default AuthDetails;
