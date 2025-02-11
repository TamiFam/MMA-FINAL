import React, { createContext,useState,useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, 
  updateProfile, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { app } from '../../config/firebase.init'
import { GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

 export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState('')

  const auth = getAuth(app);
 // sign up new user
 const SignUp = async(email, password) => {
try {
  setLoader(true)
  return await createUserWithEmailAndPassword(auth, email, password)
} catch (error) {
  setError(error.code)
  throw error
}
 }

 // login user
 const login =  async(email, password) => {
  try {
    setLoader(true)
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    setError(error.code)
  throw error
}
  }
 

 //logout user

 const logout = async() => {
try {
  return await signOut(auth)
} catch (error) {
  setError(error.code)
  throw error
}
 }

 //update user profile

 const updateUser = async(name,photo)=> {
  try {
    await updateProfile(auth.currentUser , {
      displayName: name, photoURL: photo
    })
    setUser(auth.currentUser)
  } catch (error) {
    setError(error.code)
  throw error
  }

}

// using google login
const googleProvider = new GoogleAuthProvider();
const googleLogin = async () => {
  try {
    setLoader(true)
    return await signInWithPopup(auth, googleProvider)
  } catch (error) {
    setError(error.code)
    throw error
  }
}

//observer for users

useEffect(() => {
const unsubscribe = onAuthStateChanged(auth,(user) => {
  setUser(user)
  // console.log("User from Firebase:", user)
  if(user) {
    
    axios.post(`https://mma-server-x3l2.onrender.com/api/set-token`

,{email: user.email, name: user.displayName})
    .then((data) =>{
      if(data.data.token) {
        localStorage.setItem('token',data.data.token)
        setLoader(false)
      }
    })
  }
  else {
    localStorage.removeItem('token')
    setLoader(false)
  }
})
return () => unsubscribe()
},[])
const deleteUserFromFirestore = async (id) => {
  try {
    const userDocRef = doc(db, "users", id);
    await deleteDoc(userDocRef);
  } catch (error) {
    setError(error.code);
    throw error;
  }
};
    

  const contextValue = {user,SignUp,login,logout,updateUser,googleLogin,error, setError,loader,setLoader,deleteUserFromFirestore}
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider