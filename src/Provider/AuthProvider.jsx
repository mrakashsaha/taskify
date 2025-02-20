import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.init";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
                
            } else {
                console.log('no user found');
                setLoading(false);
            }

            return () => unsubscribe();
        });

    }, [user, loading]);

    const contineWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutFromAccount = () => {
        setLoading(true);
        return signOut(auth);
    }
    

    const authInfo = {
        contineWithGoogle,
        signOutFromAccount, 
        loading,
        setLoading, 
        user,
        setUser,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;