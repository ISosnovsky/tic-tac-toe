import { Sequelize } from "sequelize-typescript";
import config from "./../config";

export default new Sequelize({
	database: config.database,
	dialect: config.dialect,
	username: "Ilya",
	password: "",
	storage: ":memory:",
	modelPaths: [__dirname + "/models"],
	operatorsAliases: false
});
