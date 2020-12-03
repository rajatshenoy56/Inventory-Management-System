CREATE TRIGGER add_equipment
    AFTER INSERT 
    ON equipment 
    FOR EACH ROW
    EXECUTE PROCEDURE
    add_equipment_func()