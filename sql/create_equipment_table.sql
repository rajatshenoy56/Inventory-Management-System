CREATE TABLE equipment(id SERIAL PRIMARY KEY, 
name VARCHAR,
cost INTEGER,
quantity INTEGER,
godownid INTEGER REFERENCES godown(id),
companyid INTEGER REFERENCES company(id));