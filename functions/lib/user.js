"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserWithUsername = void 0;
const https_1 = require("firebase-functions/v1/https");
const firebase_admin_1 = require("firebase-admin");
const firebase_functions_1 = require("firebase-functions");
exports.createUserWithUsername = (0, https_1.onCall)(async (data, context) => {
    if (!context.auth) {
        throw new https_1.HttpsError("unauthenticated", "User is not authenticated");
    }
    const db = (0, firebase_admin_1.database)();
    const dataInvalid = !data.username;
    if (dataInvalid)
        throw new https_1.HttpsError("invalid-argument", "Wrong data provided");
    const uid = context.auth.uid;
    const usernameExists = (await db.ref(`userName/${data.username.toLowerCase()}`).get()).val();
    if (!!usernameExists)
        throw new https_1.HttpsError("already-exists", "Username already exists");
    const user = {
        username: data.username,
        moderator: false,
    };
    // make new user
    db.ref(`userData/${uid}`).set(user);
    db.ref(`userName/${data.username.toLowerCase()}`).set(uid);
    firebase_functions_1.logger.info(`User ${uid} created with username ${data.username}`);
    return user;
});
//# sourceMappingURL=user.js.map