import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const AuthContext = createContext()

function AuthProvider(props){
    const [userInfo, setUserInfo] = useState({})
    const values = {userInfo,setUserInfo}
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const docRef = query(
              collection(db, "users"),
              where("email", "==", user.email)
            );
            onSnapshot(docRef, (snapshot) => {
              snapshot.forEach((doc) => {
                setUserInfo({
                  ...user,
                  ...doc.data(),
                });
              });
            });
            // setUserInfo(user);
          } else {
            setUserInfo(null);
          }
        });
      }, []);
    return <AuthContext.Provider value={values} {...props}></AuthContext.Provider>
}

function useAuth(){
    const context = useContext(AuthContext)
    if(typeof context === "undefined") 
        throw new Error("please close your tag in provider tag")
    return context
}

export {AuthProvider, useAuth}