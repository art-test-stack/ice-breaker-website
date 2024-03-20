
import { createContext, useEffect, useState } from 'react';
import { ref, onValue, get } from "firebase/database"
import { database } from "./init"

// create a context for the reviews list
export const currentReviewsList = createContext<{[id: string]: any}>({})

export const CurrentGameReviewsProvider = ({ children, gameId }: { children: any, gameId: string | undefined }) => {
    const [reviewsList, setReviewsList] = useState<any[]>([])

    useEffect(() => {
        const gameReviewsRef = ref(database, `games/${gameId}/reviewIDs`); 
        onValue(gameReviewsRef, async (snapshot) => {
            if (snapshot.exists()) {
                const reviewIDs = snapshot.val();
                const reviewsPromises = Object.values(reviewIDs).map((reviewId) => {
                    const reviewRef = ref(database, `reviews/${reviewId}`);
                    return get(reviewRef)
                });
                const reviews = await Promise.all(reviewsPromises);
                const reviewsList = reviews.map((review) => review.val());
                // add review ids as properties to the reviews objects
                reviewsList.forEach((review, index) => {
                    review.id = Object.values(reviewIDs)[index];
                });
                setReviewsList(reviewsList);
            } else {
                setReviewsList([]);
            }
        }, (error) => {
            console.error("Error getting review IDs:", error);
            setReviewsList([]);
        }); 
    }, [gameId]); 

    return (
        <currentReviewsList.Provider value={reviewsList}>
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