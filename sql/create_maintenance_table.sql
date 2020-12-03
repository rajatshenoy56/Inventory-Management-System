CREATE TABLE maintenance(id INTEGER PRIMARY KEY,
equipmentid INTEGER REFERENCES equipment(id),
technicianid INTEGER REFERENCES technician(id),
maintenance_date DATE,
remarks VARCHAR);