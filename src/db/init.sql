CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    population INT NOT NULL
);

INSERT INTO cities (name, population) VALUES 
('Sofia', 1236000),
('Plovdiv', 343000),
('Varna', 335000),
('Burgas', 202000),
('Ruse', 142000);