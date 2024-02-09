import { onCall, HttpsError } from "firebase-functions/v1/https"
import { database } from "firebase-admin"
import { logger } from "firebase-functions"

export const createUserWithUsername = onCall(async (data, context) => {
    if (!context.auth) {
        throw new HttpsError("unauthenticated", "User is not authenticated")
    }
    const db = database()

    const dataInvalid = !data.username || !data.uid
    if (dataInvalid) throw new HttpsError("invalid-argument", "Wrong data provided")

    const usernameExists = (await db.ref(`userName/${data.username.toLowerCase()}`).get()).val()
    if (!!usernameExists) throw new HttpsError("already-exists", "Username already exists")

    const user = {
        username: data.username,
        moderator: false,
    }

    // make new user
    db.ref(`userData/${data.uid}`).set(user)
    db.ref(`userName/${data.username.toLowerCase()}`).set(data.uid)
    logger.info(`User ${data.uid} created with username ${data.username}`)

    return user
})
