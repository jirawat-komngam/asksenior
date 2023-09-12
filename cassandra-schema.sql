-- University Service
DROP KEYSPACE asksenior_university_service;
CREATE KEYSPACE asksenior_university_service WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};

use asksenior_university_service;
CREATE TABLE universities(
   universityID UUID,
   universityName VARCHAR,
   universityShortName VARCHAR,
   universityOrder INT,
   faculties VARCHAR,
   PRIMARY KEY (universityID)
);
INSERT INTO universities (universityid, universityorder, faculties, universityname, universityshortname) VALUES ('6efe7d50-8e28-4139-b82f-b64acfbe36df', 0, '{"data": [{"facultyID": "82a56278-5d87-46d4-9244-4c4de76c8199", "facultyName": "??????????????", "fields": [{"fieldID": "106102ce-c670-446c-96b9-0375ba657632", "fieldName": "???????????"}]}]}', 'King Mongkut?s University of Technology Thonburi', 'KMUTT');
INSERT INTO universities (universityid, universityorder, faculties, universityname, universityshortname) VALUES ('3c9f5096-0fcd-4979-b971-4e5d457e98b3', 1, '{"data": [{"facultyID": "82a56278-5d87-46d4-9244-4c4de76c8199", "facultyName": "??????????????", "fields": [{"fieldID": "106102ce-c670-446c-96b9-0375ba657632", "fieldName": "???????????"}]}]}', 'King Mongkut?s Institute of Technology Ladkrabang', 'KMITL');


-- User Service
DROP KEYSPACE asksenior_user_service;
CREATE KEYSPACE asksenior_user_service WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};

use asksenior_user_service;
CREATE TABLE users(
   userID UUID,
   userName VARCHAR,
   userEmail VARCHAR,
   userYear INT,
   fieldID UUID,
   PRIMARY KEY (userID)
);
CREATE INDEX ON users (userEmail);

INSERT INTO users (userid, username, useremail, useryear, fieldid) VALUES ('8a271090-67d5-403b-994a-842f139aa7c3', 'test', 'test.mail@kmutt.com',1,'106102ce-c670-446c-96b9-0375ba657632');
-- Post Service
DROP KEYSPACE asksenior_post_service;
CREATE KEYSPACE asksenior_post_service WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};

use asksenior_post_service;
CREATE TABLE posts(
   postID UUID,
   postTitle VARCHAR,
   postDescription VARCHAR,
   userID UUID,
   userName VARCHAR,
   fieldID UUID,
   comments VARCHAR,
   PRIMARY KEY (postID)
);
INSERT INTO posts (postid, posttitle, postdescription, userid, username, fieldid, comments) VALUES ('9384618f-6334-4b9f-a5ff-14e782073964', 'new post haha', 'sssssssssssssssssssssssssssssssswdwdwdfcvcvcssssss','8a271090-67d5-403b-994a-842f139aa7c3','test','106102ce-c670-446c-96b9-0375ba657632','{"comments": []}');
CREATE INDEX ON posts (fieldID);
CREATE INDEX ON posts (userID);