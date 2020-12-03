CREATE TABLE technician(id INTEGER PRIMARY KEY,
name VARCHAR,
address VARCHAR,
phone VARCHAR,
godownid INTEGER REFERENCES godown(id));