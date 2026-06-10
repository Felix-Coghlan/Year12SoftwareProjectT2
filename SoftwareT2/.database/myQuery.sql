-- CREATE TABLE Games(ID INTERGER NOT NULL PRIMARY KEY,name TEXT NOT NULL,genre TEXT NOT NULL,subgenre TEXT NOT NULL,multiplayer BOOLEAN NOT NULL,creator TEXT NOT NULL, releasedate TEXT NOT NULL, hyperlink TEXT NOT NULL);
--INSERT INTO Games(ID,name,genre,subgenre,multiplayer,creator,releasedate,hyperlink) VALUES (1,'Minecraft','Survival','Adventure',TRUE,'Mojang','17/5/2007', 'https://www.minecraft.net/en-us/about-minecraft');
--TO Games(ID,name,genre,subgenre,multiplayer,creator,releasedate,hyperlink) VALUES (2,'subnautica','survival','adventure',FALSE,'unknown worlds entertainment','23/1/2018', 'https://store.steampowered.com/app/264710/Subnautica/');

SELECT * FROM Games;

-- UPDATE Games
-- SET creator = 'mojang'
-- WHERE name = 'minecraft';

-- INSERT INTO Games(ID,name,genre,subgenre,multiplayer,creator,releasedate,hyperlink) 
-- VALUES 
--     (3,'helldivers 2','action','shooter',TRUE,'arrowhead game studios','8/2/2024', 'https://store.steampowered.com/app/553850/HELLDIVERS_2/'),
--     (4,'dispatch','superhero','story',FALSE,'adhoc studio','23/10/2025', 'https://store.steampowered.com/app/2592160/Dispatch/'),
--     (5,'baldurs gate 3','story','rpg',TRUE,'larian studios','4/8/2023', 'https://store.steampowered.com/app/1086940/Baldurs_Gate_3/'),
--     (6,'elden ring','rpg','fantasy',TRUE,'fromsoftware, inc','25/2/2022', 'https://store.steampowered.com/app/1245620/ELDEN_RING/'),
--     (7,'omori','horror','indie',FALSE,'omocat','25/12/2020', 'https://store.steampowered.com/app/1150690/OMORI/'),
--     (8,'undertale','rpg','story',FALSE,'tobyfox', '15/9/2015', 'https://store.steampowered.com/app/391540/Undertale/'),
--     (9,'fifa 22','sport','soccer',TRUE,'ea','1/10/2021', 'https://store.steampowered.com/app/1506830/FIFA_22/'),
--     (10,'fortnite','shooter','battle royal',TRUE,'epic games','21/7/2017', 'https://www.fortnite.com/'),
--     (11,'hades','roguelite','indie',FALSE,'supergiant games','18/9/2020', 'https://store.steampowered.com/app/1145360/Hades/'),
--     (12,'animal crossing: new horizons','simulation','adventure',TRUE,'nintendo','20/3/2020', 'https://animalcrossing.nintendo.com/new-horizons/');