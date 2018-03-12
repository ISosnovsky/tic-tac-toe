"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("./../config");
exports.default = new sequelize_typescript_1.Sequelize({
    database: config_1.default.database,
    dialect: config_1.default.dialect,
    username: config_1.default.name,
    password: "357159",
    storage: ":memory:",
    modelPaths: [__dirname + "/models"],
    operatorsAliases: false
});
//# sourceMappingURL=index.js.map