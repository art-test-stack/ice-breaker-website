
import { createContext, useEffect, useState } from 'react';
import { ref, onValue, get } from "firebase/database"
import { database } from "./init"

// create a context for the reviews list
export const currentReviewsList = createContext<{[id: string]: any}>({})

export const CurrentGameReviewsProvider = ({ children }: { children: any }) => {
    const [reviewsList, setReviewsList] = useState<{[id: string]: any}>({})

    const getGameReviews = (gameId: string) => {
        const gameRef = ref(database, `games/${gameId}/reviewIDs`); 
        onValue(gameRef, async (snapshot) => {
            if (snapshot.exists()) {
                const reviewIDs = snapshot.val();
                const reviewsPromises = Object.keys(reviewIDs).map((reviewId) => {
                    const reviewRef = ref(database, `reviews/${reviewId}`);
                    return get(reviewRef).then((reviewSnapshot) => {
                        if (reviewSnapshot.exists()) {
                            return reviewSnapshot.val();
                        } else {
                            return null;
                        }
                    }).catch((error) => {
                        console.error("Error getting review:", error);
                        return null;
                    });
                });
                const reviews = await Promise.all(reviewsPromises);
                const filteredReviews = reviews.filter(review => review !== null);
                setReviewsList(filteredReviews);
            } else {
                setReviewsList([]);
            }
        }, (error) => {
            console.error("Error getting review IDs:", error);
            setReviewsList([]);
        }); 
    }; 

    return (
        <currentReviewsList.Provider value={{ reviewsList, getGameReviews}}>
            {children}
        </currentReviewsList.Provider>
    ); 
}; 

//     useEffect(() => {
//         // listen list
//         const reviewsRef = ref(database, 'reviews')
//         const reviewsListener = onChildAdded(reviewsRef, (snapshot) => {
//             setReviewsList((prev) => {
//                 return {
//                     ...prev,
//                     [snapshot.key as string]: snapshot.val()
//                 }
//             })
//         })
//         const reviewsRemovedListener = onChildRemoved(reviewsRef, (snapshot) => {
//             setReviewsList((prev) => {
//                 const newReviewsList = { ...prev }
//                 delete newReviewsList[snapshot.key as string]
//                 return newReviewsList
//             })
//         })
//         return () => {
//             reviewsListener()
//             reviewsRemovedListener()
//         }
//     }, [])
    
//     return <currentReviewsList.Provider value={reviewsList}>{children}</currentReviewsList.Provider>
// }

export const getReview = (id: string) => {
    return ref(database, `reviews/${id}`)
}