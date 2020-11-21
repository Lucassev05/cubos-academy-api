create table clients (
	id SERIAL primary key,
	user_id INTEGER not null,
	cpf numeric not NULL,
	email text,
	tel NUMERIC,
	name text not null
)

create table users (
	id SERIAL primary key,
	email text not NULL,
	password text not NULL,
	name text not NULL
)

create table charges (
	id SERIAL primary key,
	client_id integer not null,
	description text,
	amount numeric not NULL,
	expiration_date TIMESTAMP,
	link text,
	status text not NULL
)
