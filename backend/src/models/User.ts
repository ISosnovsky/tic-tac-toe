import { Table, Column, Model, HasMany } from "sequelize-typescript";

@Table
export default class User extends Model<User> {
	@Column name: string;

	@Column age: number;
}
