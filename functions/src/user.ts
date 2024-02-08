import { onCall, HttpsError } from "firebase-functions/v2/https"
import { database } from "firebase-admin"
import { logger } from "firebase-functions"

export const createUserWithUsername = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "User is not authenticated")
    }

    const data = request.data
    const db = database()
    const usernameExists = (await db.ref(`userName/${data.username.toLowerCase()}`).get()).val()

    if (usernameExists !== undefined) throw new HttpsError("already-exists", "Username already exists")
    const dataInvalid = !data.username || !data.uid
    if (dataInvalid) throw new HttpsError("invalid-argument", "Wrong data provided")

    const user = {
        username: data.username,
        moderator: false,
    }

    // make new user
    db.ref(`userData/${data.uid}`).set(user)
    logger.info(`User ${data.uid} created with username ${data.username}`)

    return user
})
