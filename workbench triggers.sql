use location ;
create table voitureLouee(
matricule int ,
cin varchar(50) ,
date_debut date ,
date_fin date ,
foreign key(matricule) references voiture(matricule) ,
foreign key(cin) references clients(cin) ,
primary key(matricule , cin , date_debut , date_fin)


);


DELIMITER $$

CREATE TRIGGER set_Date_debut_fin_location
AFTER INSERT ON voiturelouee
FOR EACH ROW
BEGIN
    DECLARE v_date_debut DATE;
    DECLARE v_date_fin DATE;

    -- Get the minimum date_debut and maximum date_fin for the given matricule
    SET v_date_debut = (select min(date_debut) from voiturelouee where matricule = new.matricule) ;
    SET v_date_fin = (SELECT MAX(date_fin) FROM voiturelouee WHERE matricule = NEW.matricule);

    -- Update the voiture table with the calculated dates
    UPDATE voiture
    SET date_debut_location = v_date_debut,
        date_fin_location = v_date_fin
    WHERE matricule = NEW.matricule;
END $$

DELIMITER ;



drop trigger set_Date_debut_fin_location ;

insert into voiturelouee values(1,'s12345','2024-11-10','2026-12-14') ;
delete from voiturelouee where matricule=1 ;

--  on delete

DELIMITER $$

CREATE TRIGGER set_Date_debut_fin_location_To_Null
AFTER delete ON voiturelouee
FOR EACH ROW
BEGIN
    DECLARE v_date_debut DATE;
    DECLARE v_date_fin DATE;

    -- Get the minimum date_debut and maximum date_fin for the given matricule
    SET v_date_debut = (select min(date_debut) from voiturelouee where matricule = new.matricule) ;
    SET v_date_fin = (SELECT MAX(date_fin) FROM voiturelouee WHERE matricule = NEW.matricule);
    -- Update the voiture table with the calculated dates
    UPDATE voiture
    SET date_debut_location = v_date_debut,
        date_fin_location = v_date_fin
    WHERE matricule = NEW.matricule;
END $$

DELIMITER ;