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
INSERT INTO universities (universityid, universityorder, faculties, universityname, universityshortname) VALUES ('1efe7d50-8e28-4139-b82f-b64acfbe36df', 0, '{"data":[{"facultyID":"82a56278-5d87-46d4-9244-4c4de76c8199","facultyName":"คณะวิศวกรรมศาสตร์","fields":[{"fieldID":"116102ce-c670-446c-96b9-0375ba657632","fieldName":"โยธา"},{"fieldID":"126102ce-c670-446c-96b9-0375ba657632","fieldName":"คอมพิวเตอร์"},{"fieldID":"136102ce-c670-446c-96b9-0375ba657632","fieldName":"เครื่องกล"},{"fieldID":"146102ce-c670-446c-96b9-0375ba657632","fieldName":"ไฟฟ้า"}]},{"facultyID":"92a56278-5d87-46d4-9244-4c4de76c8199","facultyName":"คณะวิทยาศาสตร์","fields":[{"fieldID":"106102ce-c670-446c-96b9-0375ba657633","fieldName":"ฟิสิกส์"},{"fieldID":"106102ce-c670-446c-96b9-0375ba657634","fieldName":"คณิตศาสตร์"},{"fieldID":"102102ce-c670-446c-96b9-0375ba657634","fieldName":"ชีววิทยา"}]}]}', 'King Mongkut`s University of Technology Thonburi', 'KMUTT');
INSERT INTO universities (universityid, universityorder, faculties, universityname, universityshortname) VALUES ('2c9f5096-0fcd-4979-b971-4e5d457e98b3', 1, '{"data":[{"facultyID":"82a56278-5d87-46d4-9244-4c4de76c8299","facultyName":"คณะวิศวกรรมศาสตร์","fields":[{"fieldID":"116102ce-c670-446c-96b9-0375ba657642","fieldName":"โยธา"},{"fieldID":"126102ce-c670-446c-96b9-0375bb657632","fieldName":"คอมพิวเตอร์"},{"fieldID":"136102ce-c670-446c-96b9-0385ba657632","fieldName":"เครื่องกล"},{"fieldID":"146102ce-c670-446c-96b9-0375bq657632","fieldName":"ไฟฟ้า"}]},{"facultyID":"92a56278-5d87-46d4-9244-4c4de76j8199","facultyName":"คณะวิทยาศาสตร์","fields":[{"fieldID":"106102ce-c670-446c-96b5-0375ba657633","fieldName":"ฟิสิกส์"},{"fieldID":"106102ce-c670-446c-96b7-0375ba657634","fieldName":"คณิตศาสตร์"},{"fieldID":"102102ce-c670-446c-96b2-0375ba657634","fieldName":"ชีววิทยา"}]}]}', 'King Mongkut`s Institute of Technology Ladkrabang', 'KMITL');
INSERT INTO universities (universityid, universityorder, faculties, universityname, universityshortname) VALUES ('9c9f5096-0fcd-4979-b971-4e5d457e98bd', 2, '{"data":[{"facultyID":"82a56278-5d77-46d4-9244-4c4de76c8299","facultyName":"คณะวิศวกรรมศาสตร์","fields":[{"fieldID":"116102ce-c270-446c-96b9-0375ba657642","fieldName":"โยธา"},{"fieldID":"126102ce-c610-446c-96b9-0375bb657632","fieldName":"คอมพิวเตอร์"},{"fieldID":"136102ce-c670-446c-96b9-9385ba657632","fieldName":"เครื่องกล"},{"fieldID":"146102ce-c670-446c-96b9-0370bq657632","fieldName":"ไฟฟ้า"}]},{"facultyID":"92a56278-5d87-46d4-9244-4c4de7hj8199","facultyName":"คณะวิทยาศาสตร์","fields":[{"fieldID":"106102ce-c670-446c-96b5-0375bag57633","fieldName":"ฟิสิกส์"},{"fieldID":"106102ce-c670-446c-96b7-0375ca657634","fieldName":"คณิตศาสตร์"},{"fieldID":"102102ce-c670-446c-9ab2-0375ba657634","fieldName":"ชีววิทยา"}]}]}', 'Chulalongkorn University', 'CU');

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
-- INSERT INTO posts (postid, posttitle, postdescription, userid, username, fieldid, comments) VALUES ('9384618f-6334-4b9f-a5ff-14e782073964', 'new post haha', 'sssssssssssssssssssssssssssssssswdwdwdfcvcvcssssss','8a271090-67d5-403b-994a-842f139aa7c3','test','106102ce-c670-446c-96b9-0375ba657632','{"comments": []}');
CREATE INDEX ON posts (fieldID);
CREATE INDEX ON posts (userID);