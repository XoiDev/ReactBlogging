import { useContext, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext()

function AuthProvider(props){
    const [userInfo, setUserInfo] = useState({})
    const values = {userInfo,setUserInfo}
    return <AuthContext.Provider value={values} {...props}></AuthContext.Provider>
}

function useAuth(){
    const context = useContext(AuthContext)
    if(typeof context === "undefined") 
        throw new Error("please close your tag in provider tag")
    return context
}

export {AuthProvider, useAuth}