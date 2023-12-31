import {useContext , createContext, useState, useEffect} from "react";
import {auth} from '@/firebase/config'
import {signInWithPopup ,GoogleAuthProvider ,signOut, onAuthStateChanged} from 'firebase/auth'
import axios from "axios";

const AuthContext = createContext();

export const  AuthContextProvider = ({children}) =>{
    const [user , setUser] = useState(null);
    const [isLoading ,setIsLoading] = useState(true);

    const googleSignIn = () =>{
        const Provider = new  GoogleAuthProvider();
        signInWithPopup(auth ,Provider).then((res)=>{
            axios.post(`${process.env.NEXT_PUBLIC_FIREBASE_BASE_URL}/users.json`, res.user, {
                headers: {
                  ContentType: 'application/json'
                }
              })
        })
    }
    const logOut = () =>{
        signOut(auth);
        setUser(null)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth ,(currentUser) =>{
            setUser(currentUser)
            setIsLoading(false)
        })     
        return ()=> unsubscribe()
    } , [user])
    
    return (
        <AuthContext.Provider value={{user ,googleSignIn,logOut,isLoading}}>{children}</AuthContext.Provider>
    )
}

export  const UserAuth = () =>{
    return useContext(AuthContext);
}