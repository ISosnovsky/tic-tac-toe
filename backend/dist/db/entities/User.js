"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../../models/User");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: "tic-tac-toe",
    dialect: "postgresql",
    username: "Ilya",
    password: "",
    storage: ":memory:"
});
sequelize.addModels([User_1.default]);
sequelize.sync();
const person = new User_1.default({ name: "bob", age: 99 });
person.save();
//# sourceMappingURL=User.js.map