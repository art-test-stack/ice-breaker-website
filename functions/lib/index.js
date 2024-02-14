"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserWithUsername = void 0;
const app_1 = require("firebase-admin/app");
var user_1 = require("./user");
Object.defineProperty(exports, "createUserWithUsername", { enumerable: true, get: function () { return user_1.createUserWithUsername; } });
(0, app_1.initializeApp)();
//# sourceMappingURL=index.js.map