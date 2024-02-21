
import { createContext, useEffect, useState } from 'react';
import {  ref, onChildAdded, onChildRemoved } from "firebase/database"
import { database } from "./init"

// create a context for the games list
export const currentGamesList = createContext<{[id: string]: any}>({})

export const CurrentGamesProvider = ({ children }: { children: any }) => {
    const [gamesList, setGamesList] = useState<{[id: string]: any}>({})
    useEffect(() => {
        // listen games list
        const gamesRef = ref(database, 'games')
        const gamesListener = onChildAdded(gamesRef, (snapshot) => {
            setGamesList((prev) => {
                return {
                    ...prev,
                    [snapshot.key as string]: snapshot.val()
                }
            })
        })
        const gamesRemovedListener = onChildRemoved(gamesRef, (snapshot) => {
            setGamesList((prev) => {
                const newGamesList = { ...prev }
                delete newGamesList[snapshot.key as string]
                return newGamesList
            })
        })
        return () => {
            gamesListener()
            gamesRemovedListener()
        }
    }, [])
    
    return <currentGamesList.Provider value={gamesList}>{children}</currentGamesList.Provider>
}