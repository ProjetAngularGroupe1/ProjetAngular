INSERT INTO user (id, username, password)
VALUES 
    (0, 'hfr4', 'password'),
    (1, 'chay31', 'password'),
    (2, 'damienien', 'password'),
    (3, 'mrworldwide97', 'password'),
    (4, 'salmaayachi', 'password');


INSERT INTO comment (id, body, like_count, articleId, userId, created_at, updated_at)
VALUES  
    (0, 'Lol'                        , 0,  1, 0, date(), date() ),
    (1, 'Lmao'                       , 0,  2, 0, date(), date() ),
    (2, 'Kepp it up !'               , 0,  3, 0, date(), date() ),
    (3, 'Nice'                       , 0,  1, 1, date(), date() ),
    (4, 'Great advice'               , 0,  3, 2, date(), date() ),
    (5, 'Never post an article again', 0,  3, 3, date(), date() ),
    (6, 'KYS'                        , 0,  2, 4, date(), date() ),
    (7, 'Love you'                   , 0,  2, 5, date(), date() );


INSERT INTO article (id, title, body, like_count, created_at, updated_at, userId)
VALUES 
    (0, 'My First Article'         , 'This is the body of my first article.', 0, date(), date(), 3),
    (1, 'Is the earth flat ?'      , 'Yes.'                                 , 0, date(), date(), 3),
    (2, 'How to double jump IRL'   , 'Jump another time in mid air.'        , 0, date(), date(), 2),
    (3, 'To be or not to be'       , 'That is the question.'                , 0, date(), date(), 2),
    (4, 'Chicken review'           , 'Nice.'                                , 0, date(), date(), 1),
    (5, 'How to get rich in 3 days', 'Buy bitcoins.'                        , 0, date(), date(), 1);


