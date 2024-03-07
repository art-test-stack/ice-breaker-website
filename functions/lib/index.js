"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageRating = exports.createUserWithUsername = void 0;
const app_1 = require("firebase-admin/app");
var user_1 = require("./user");
Object.defineProperty(exports, "createUserWithUsername", { enumerable: true, get: function () { return user_1.createUserWithUsername; } });
var reviews_1 = require("./reviews");
Object.defineProperty(exports, "getAverageRating", { enumerable: true, get: function () { return reviews_1.getAverageRating; } });
(0, app_1.initializeApp)();
//# sourceMappingURL=index.js.map