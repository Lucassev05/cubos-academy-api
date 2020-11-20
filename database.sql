create table clients (
	id SERIAL primary key,
	user_id INTEGER not null,
	FOREIGN key(user_id) references users(id),
	cpf numeric not NULL,
	email text,
	tel NUMERIC,
	first_name text not NULL,
	last_name text not NULL
)

create table users (
	id SERIAL primary key,
	email text not NULL,
	password text not NULL,
	first_name text not NULL,
	last_name text not NULL
)

create table charges (
	id SERIAL primary key,
	client_id integer not null,
	FOREIGN key (client_id) references clients(id),
	description text,
	amount numeric not NULL,
	expiration_date TIMESTAMP,
	link text,
	status text not NULL
)
