ALTER TABLE cities ADD COLUMN IF NOT EXISTS country VARCHAR(100);

UPDATE cities SET country = 'Bulgaria' WHERE name = 'Sofia';
UPDATE cities SET country = 'Bulgaria' WHERE name = 'Plovdiv';
UPDATE cities SET country = 'Bulgaria' WHERE name = 'Varna';