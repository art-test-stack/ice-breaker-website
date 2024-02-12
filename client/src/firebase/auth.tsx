import { onAuthStateChanged, type User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from 'react';
import { onValue, ref, get } from "firebase/database"
import { database, auth, createUserWithUsername } from "./init"

type UserData = {
    username: string;
    moderator: boolean;
};
type UserDataValue = {
    user: User | null;
    data: UserData | null;
};

// create a context for the user data
export const currentUserData = createContext<UserDataValue | null>(null)

export const CurrentUserDataProvider = ({ children }: { children: any }) => {
    const [userData, setUserData] = useState<UserDataValue | null>(null)
    let userDataListener: any | null = null
    useEffect(() => {
        // listen for auth state changes
        return onAuthStateChanged(auth, async (user) => {
            
            if (user) {
                // if is already logged in, get the user data
                let userDataValue = {
                    user,
                    data: null,
                }
                console.log("changed user data")
                const userRef = ref(database, `userData/${user.uid}`)

                // if no value, prompt user for username
                userDataValue.data = (await get(ref(database, `userData/${user.uid}`))).val()
                if (userDataValue.data == null) {
                    let username = prompt("Please enter a username")
                    if (username != null) {
                        await createUserWithUsername({ username })
                    }
                }

                userDataListener = onValue(userRef, (snapshot) => {
                    if (snapshot.exists()) {
                        userDataValue.data = snapshot.val()
                        setUserData(userDataValue)
                    }
                })
                
            } else {
                // if is not logged in, reset the context
                if (userDataListener != null) {
                    userDataListener()
                }
                setUserData(null)
            }
        })
    }, [])
    
    return <currentUserData.Provider value={userData}>{children}</currentUserData.Provider>
}

export const AuthUI = () => {
    const userData = useContext(currentUserData);

    let [errorMessage, setErrorMessage] = useState<string | null>(null)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    
    if (userData) {
        return <>
            <h3>Logged in as {userData.data?.username}</h3>
            <button onClick={() => {
                signOut(auth)
            }}>sign out</button>
        </>
    } else {
        
        return <>
            <div className="login-ui-container">
                <h3>Temporary Login UI :)</h3>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button onClick={() => {
                    signInWithEmailAndPassword(auth, email, password).then(() => {
                        console.log("logged in")
                    }).catch((error) => {
                        setErrorMessage(error.message)
                    })
                }}>sign in</button>

                <button onClick={() => {
                    createUserWithEmailAndPassword(auth, email,password).catch((error) => {
                        setErrorMessage(error.message)
                    })
                }}>register</button>

                <p style={{color: 'pink'}}>{errorMessage}</p>
            </div>
        </>
    }
}
