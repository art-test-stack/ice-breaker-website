import { onCall, HttpsError } from "firebase-functions/v1/https"
import { database } from "firebase-admin"

export interface Game {
    author: string
    name: string
    aliases: string[]
    imageUrl: string
    categories: number[]
    description: string
    rules: string
    num_players: number
    duration: number
    equipment: string
    ratings: string[]
}

export interface PostGameData {
    author: string
    name: string
    imageUrl: string
    categories: number[]
    description: string
    rules: string
    num_players: number
    duration: number
    equipment: string
}

export const postGame = onCall(async (data: PostGameData, context) => {
    if (!context.auth) {
        throw new HttpsError("unauthenticated", "User is not authenticated")
    }
    const db = database()

    const game: Game = {
        author: context.auth.uid,
        name: data.name,
        aliases: [],
        imageUrl: data.imageUrl,
        categories: data.categories,
        description: data.description,
        rules: data.rules,
        num_players: data.num_players,
        duration: data.duration,
        equipment: data.equipment,
        ratings: [],
    }

    return await db.ref("games").push(game).key
})
