import { createContext, useState } from "react";
import { useContext } from "react";
const AuthContext = createContext();
export const Authenticationprovider=({children})=>{
    const [isAuthenticated,setauthenticated]=useState(false)
    const loginverif=()=>{
        setauthenticated(true)
    }
    const logout=()=>{
        setauthenticated(false)
    }
    return(
        <AuthContext.Provider value={{ isAuthenticated, loginverif, logout }}>
        {children}
    </AuthContext.Provider>
    )
}
export const UseAuth = () => useContext(AuthContext);