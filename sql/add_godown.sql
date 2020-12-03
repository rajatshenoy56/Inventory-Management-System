CREATE TRIGGER add_godown
    AFTER INSERT 
    ON godown 
    FOR EACH ROW
    EXECUTE PROCEDURE 
    add_godown_func();