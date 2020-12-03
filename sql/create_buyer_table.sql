CREATE TABLE buyer(id SERIAL PRIMARY KEY,
name VARCHAR,
phone INTEGER,      
godownid INTEGER REFERENCES godown(id),
address VARCHAR);