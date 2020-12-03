CREATE OR REPLACE FUNCTION func_remove_equipment() RETURNS trigger AS $BODY$
    BEGIN
        UPDATE godown SET types_of_equipment = types_of_equipment - 1 WHERE id = OLD.godownid;
        RETURN OLD;
    END;
$BODY$ LANGUAGE plpgsql VOLATILE COST 100;
