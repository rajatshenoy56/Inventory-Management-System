CREATE TABLE godown(id SERIAL PRIMARY KEY,
address VARCHAR,
companyid INTEGER REFERENCES company(id),
inid INTEGER REFERENCES users(uid) ,
types_of_equipment INTEGER DEFAULT 0);