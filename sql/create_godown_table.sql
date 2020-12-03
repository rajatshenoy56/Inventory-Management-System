CREATE TABLE godown(id INTEGER PRIMARY KEY,
address VARCHAR,
phone INTEGER,
companyid INTEGER REFERENCES company(id),
inid INTEGER REFERENCES users(uid) ,
types_of_equipment INTEGER);