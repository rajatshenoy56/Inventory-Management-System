CREATE TRIGGER remove_equipment 
    AFTER DELETE 
    ON equipment
    FOR EACH ROW
    EXECUTE PROCEDURE
    func_remove_equipment();