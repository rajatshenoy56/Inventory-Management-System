CREATE OR REPLACE FUNCTION add_godown_func() RETURNS trigger AS $BODY$
    BEGIN
        UPDATE company SET no_of_godowns = no_of_godowns + 1 WHERE id = NEW.companyid;
        RETURN NEW;
    END;
$BODY$ LANGUAGE plpgsql VOLATILE COST 100;
