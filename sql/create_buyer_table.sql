CREATE TABLE buyer(id INTEGER PRIMARY KEY,
name VARCHAR,                              
email VARCHAR,
password VARCHAR,
godownid INTEGER REFERENCES godown(id),
address VARCHAR);