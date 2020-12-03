CREATE OR REPLACE FUNCTION add_equipment_func() RETURNS trigger AS $BODY$
    BEGIN 
        UPDATE godown SET types_of_equipment = types_of_equipment + 1 WHERE id = NEW.godownid;
        RETURN NEW;
    END;
$BODY$ LANGUAGE plpgsql VOLATILE COST 100;
