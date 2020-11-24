const db = require('../utils/database');

const clientsQuery = `
	CREATE TABLE IF NOT EXISTS clients (
		id SERIAL primary key,
		user_id INTEGER not null,
		cpf text not NULL,
		email text,
		tel text,
		name text not null)`;

const usersQuery = `
create table if not exists users (
	id SERIAL primary key,
	email text not NULL,
	password text not NULL,
	name text not NULL)`;

const chargesQuery = `
create table if not exists charges (
	id SERIAL primary key,
	client_id integer not null,
	description text,
	amount numeric not NULL,
	expiration_date TIMESTAMP,
	link text,
	status text not NULL)`;

(async () => {
	try {
		await db.query(clientsQuery);
		await db.query(usersQuery);
		await db.query(chargesQuery);

		console.log('Created!');
	} catch (error) {
		console.log(error);
	}
	db.end();
})();
