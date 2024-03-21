import { onCall, HttpsError } from "firebase-functions/v1/https"
import { database } from "firebase-admin"
import { logger } from "firebase-functions/v1"

// cloud function to get the average rating of a game
export const getAverageRating = onCall(async (data, context) => {
    const db = database()

    const gameId = data.gameId
    if (!gameId) throw new HttpsError("invalid-argument", "Wrong data provided")

    const reviewID_data = (await db.ref(`games/${gameId}/reviewIDs`).get()).val()

    if (!reviewID_data) return -1

    const reviewIDs: string[] = Object.values(reviewID_data)
    logger.info(`Found ${reviewIDs} for game ${gameId}`)

    let reviews = await Promise.all(
        reviewIDs.map(async (id: string) => {
            return (await db.ref(`reviews/${id}`).get()).val()
        })
    )

    reviews = reviews.filter((review: any) => review)

    const ratings = reviews.map((review: any) => parseFloat(review.rating))
    const averageRating = ratings.reduce((acc: number, rating: number) => acc + rating, 0) / ratings.length

    return averageRating
})
