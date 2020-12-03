CREATE TABLE equipment(id INTEGER PRIMARY KEY, 
name VARCHAR,
cost INTEGER,
quantity INTEGER,
godownid INTEGER REFERENCES godown(id),
companyid INTEGER REFERENCES company(id));