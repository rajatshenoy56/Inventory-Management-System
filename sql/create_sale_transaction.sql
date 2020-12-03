CREATE TABLE sale_transaction(id SERIAL PRIMARY KEY,
equipmentid INTEGER REFERENCES equipment(id),   
buyerid INTEGER REFERENCES buyer(id),
quantity INTEGER,
sale_date DATE,
godownid INTEGER REFERENCES godown(id),
value INTEGER);