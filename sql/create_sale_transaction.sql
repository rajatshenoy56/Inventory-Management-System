CREATE TABLE sale_transaction(id INTEGER PRIMARY KEY,
equipmentid INTEGER REFERENCES equipment(id),   
buyerid INTEGER REFERENCES buyer(id),
quantity INTEGER,
sale_date DATE,
godown_id INTEGER REFERENCES godown(id),
value INTEGER);