import "jest"
import * as functions from "firebase-functions-test"
import * as admin from "firebase-admin"

const testEnv = functions(
    {
        projectId: "ice-breaker-website",
        databaseURL: "https://ice-breaker-website-default-rtdb.europe-west1.firebasedatabase.app",
    },
    "./service-account.json"
)

import * as myFunctions from "../src/index"

const db = admin.database()

describe("createUserWithUsername", () => {
    let wrapped: any

    beforeAll(() => {
        wrapped = testEnv.wrap(myFunctions.createUserWithUsername)
    })

    afterAll(() => {
        testEnv.cleanup()
    })

    it("should create a user", async () => {
        const data = { username: "test_name", uid: "test_uid" }
        const context = { auth: { uid: "test_uid" } }
        const result = await wrapped(data, context)
        expect(result).toEqual({ username: "test_name", moderator: false })
        // check database

        const user = (await db.ref("userData/test_uid").get()).val()
        expect(user).toEqual({ username: "test_name", moderator: false })

        const uid = (await db.ref("userName/test_name").get()).val()
        expect(uid).toEqual("test_uid")

        // cleanup
        await db.ref("userData/test_uid").remove()
        await db.ref("userName/test_name").remove()
    })

    it("should error because user is not authenticated", async () => {
        const data = { username: "test", uid: "test" }
        await expect(wrapped(data)).rejects.toThrow("User is not authenticated")
    })

    it("should error because username already exists", async () => {
        // setup data in database
        await db.ref("userName/test").set("test")

        const data = { username: "test", uid: "test" }
        const context = { auth: { uid: "test" } }
        await expect(wrapped(data, context)).rejects.toThrow("Username already exists")

        // cleanup
        await db.ref("userName/test").remove()
    })

    it("should error because no uid was provided", async () => {
        const data = { username: "test" }
        const context = { auth: { uid: "test" } }
        await expect(wrapped(data, context)).rejects.toThrow("Wrong data provided")
    })

    it("should error because no username was provided", async () => {
        const data = { uid: "test" }
        const context = { auth: { uid: "test" } }
        await expect(wrapped(data, context)).rejects.toThrow("Wrong data provided")
    })
})
