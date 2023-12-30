INSERT INTO user (id, username, password)
VALUES 
    (0, 'hfr4', 'password'),
    (1, 'chay31', 'password'),
    (2, 'damienien', 'password'),
    (3, 'mrworldwide97', 'password'),
    (4, 'salmaayachi', 'password');


INSERT INTO comment (id, body, articleId, userId, created_at, updated_at)
VALUES  
    (0, 'Lol'                        ,  1, 0, date(), date() ),
    (1, 'Lmao'                       ,  2, 0, date(), date() ),
    (2, 'Kepp it up !'               ,  3, 0, date(), date() ),
    (3, 'Nice'                       ,  1, 1, date(), date() ),
    (4, 'Great advice'               ,  3, 2, date(), date() ),
    (5, 'Never post an article again',  3, 3, date(), date() ),
    (6, 'KYS'                        ,  2, 4, date(), date() ),
    (7, 'Love you'                   ,  2, 5, date(), date() );


INSERT INTO article (id, title, body, created_at, updated_at, userId)
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