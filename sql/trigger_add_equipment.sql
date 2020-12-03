CREATE TRIGGER add_equipment
    AFTER INSERT 
    ON equipment 
    FOR EACH ROW
    EXECUTE PROCEDURE
    func_add_equipment();