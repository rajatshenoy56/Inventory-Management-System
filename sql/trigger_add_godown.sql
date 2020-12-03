CREATE TRIGGER add_godown
    AFTER INSERT 
    ON godown 
    FOR EACH ROW
    EXECUTE PROCEDURE 
    func_add_godown();