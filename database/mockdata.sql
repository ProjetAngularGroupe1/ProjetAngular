DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS article_likes_user;
DROP TABLE IF EXISTS comment_likes_user;

CREATE TABLE user(
   id       INTEGER PRIMARY KEY,
   username VARCHAR,
   password VARCHAR
);

CREATE TABLE article(
   id        INTEGER PRIMARY KEY,
   title     VARCHAR,
   body      VARCHAR,
   createdAt DATETIME,
   updatedAt DATETIME,
   userId    INTEGER
);

CREATE TABLE comment(
   id        INTEGER PRIMARY KEY,
   body      VARCHAR,
   createdAt DATETIME,
   updatedAt DATETIME,
   userId    INTEGER,
   articleId INTEGER
);

CREATE TABLE article_likes_user(
    articleId INTEGER,
    userId    INTEGER
);

CREATE TABLE comment_likes_user(
    commentId INTEGER,
    userId    INTEGER
);

INSERT INTO user (id, username, password)
VALUES 
    (0, 'hfr4'         , 'password'),
    (1, 'chay31'       , 'password'),
    (2, 'damienien'    , 'password'),
    (3, 'mrworldwide97', 'password'),
    (4, 'salmaayachi'  , 'password');


INSERT INTO comment (id, body, articleId, userId, createdAt, updatedAt)
VALUES  
    (0, 'Lol'                        ,  1, 0, date(), date() ),
    (1, 'Lmao'                       ,  2, 0, date(), date() ),
    (2, 'Kepp it up !'               ,  3, 0, date(), date() ),
    (3, 'Nice'                       ,  1, 1, date(), date() ),
    (4, 'Great advice'               ,  3, 2, date(), date() ),
    (5, 'Never post an article again',  3, 3, date(), date() ),
    (6, 'KYS'                        ,  2, 4, date(), date() ),
    (7, 'Love you'                   ,  2, 5, date(), date() );


INSERT INTO article (id, title, body, createdAt, updatedAt, userId)
VALUES 
    (0, 'My First Article'         , 'This is the body of my first article.', date(), date(), 3),
    (1, 'Is the earth flat ?'      , 'Yes.'                                 , date(), date(), 3),
    (2, 'How to double jump IRL'   , 'Jump another time in mid air.'        , date(), date(), 2),
    (3, 'To be or not to be'       , 'That is the question.'                , date(), date(), 2),
    (4, 'Chicken review'           , 'Nice.'                                , date(), date(), 1),
    (5, 'How to get rich in 3 days', 'Buy bitcoins.'                        , date(), date(), 1);


INSERT INTO article_likes_user (articleId, userId)
VALUES 
    (0, 0),
    (0, 1),
    (0, 2),
    (0, 3),
    (0, 4),
    (1, 0),
    (1, 1),
    (2, 2),
    (2, 3),
    (2, 4),
    (4, 2),
    (5, 2);

INSERT INTO comment_likes_user (commentId, userId)
VALUES 
    (0, 0),
    (0, 1),
    (0, 2),
    (0, 4),
    (1, 0),
    (1, 1),
    (2, 2),
    (3, 2),
    (3, 4),
    (4, 2),
    (4, 4),
    (5, 2),
    (5, 4),
    (6, 2),
    (6, 4);