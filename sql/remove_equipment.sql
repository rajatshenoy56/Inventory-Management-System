CREATE TRIGGER remove_equipment 
    AFTER DELETE 
    ON equipment
    FOR EACH ROW
    EXECUTE PROCEDURE
    remove_equipment_func();