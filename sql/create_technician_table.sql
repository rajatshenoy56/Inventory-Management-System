CREATE TABLE technician(id SERIAL PRIMARY KEY,
name VARCHAR,
address VARCHAR,
phone VARCHAR,
email VARCHAR,
password VARCHAR,
godownid INTEGER REFERENCES godown(id));