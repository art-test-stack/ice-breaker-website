"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserWithUsername = void 0;
const https_1 = require("firebase-functions/v1/https");
const firebase_admin_1 = require("firebase-admin");
const firebase_functions_1 = require("firebase-functions");
exports.createUserWithUsername = (0, https_1.onCall)((request) => {
    if (!request.auth) {
        throw new https_1.HttpsError("unauthenticated", "User is not authenticated");
    }
    const data = request.data;
    const db = (0, firebase_admin_1.database)();
    db.ref(`userName/${data.username.toLowerCase()}`)
        .get()
        .then((snapshot) => {
        const usernameExists = snapshot.val();
        if (usernameExists !== undefined)
            throw new https_1.HttpsError("already-exists", "Username already exists");
        const dataInvalid = !data.username || !data.uid;
        if (dataInvalid)
            throw new https_1.HttpsError("invalid-argument", "Wrong data provided");
        const user = {
            username: data.username,
            moderator: false,
        };
        // make new user
        db.ref(`userData/${data.uid}`).set(user);
        // add to username list
        db.ref(`userName/${data.username.toLowerCase()}`).set(data.uid);
        firebase_functions_1.logger.info(`User ${data.uid} created with username ${data.username}`);
    });
});
//# sourceMappingURL=user.js.map