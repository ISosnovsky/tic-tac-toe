import { Sequelize } from "sequelize-typescript";
import UserModel from "../../models/User";

const sequelize = new Sequelize({
	database: "tic-tac-toe",
	dialect: "postgres",
	username: "Ilya",
	password: "",
	storage: ":memory:"
});
sequelize.addModels([UserModel]);
sequelize.sync();
const person = new UserModel({ name: "111111111111111", age: 99 });
person.save();
