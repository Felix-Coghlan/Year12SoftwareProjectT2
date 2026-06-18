
-- CREATE TABLE Accounts(ID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL);
--INSERT INTO Accounts(username,password) VALUES ('Felix','password');

-- DROP TABLE Checklist;

-- DELETE FROM Accounts WHERE ID>1;

-- SELECT * FROM Accounts;
SELECT * FROM Students;
-- SELECT * FROM Records;
-- SELECT * FROM Checklist;

-- CREATE TABLE Students(ID INTEGER PRIMARY KEY AUTOINCREMENT, owner TEXT NOT NULL, name TEXT NOT NULL, age INTEGER NOT NULL, class TEXT NOT NULL, skill TEXT NOT NULL, image TEXT);
-- CREATE TABLE Records(student TEXT NOT NULL, records TEXT NOT NULL);
-- CREATE TABLE Checklist(student TEXT NOT NULL, safeentry TEXT, treading TEXT, backfloat TEXT, backscull TEXT, duckdive TEXT, paddling TEXT, freestyle TEXT);

-- INSERT INTO Checklist(student,safeentry, treading, backfloat) VALUES ('Suika', '1', '1', '1');