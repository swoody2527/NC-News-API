\c nc_news

SELECT * FROM articles;
SELECT * FROM comments;

-- SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, 
-- COUNT(comments.comment_id) AS comment_count  
-- FROM articles JOIN comments ON articles.article_id = comments.article_id 
-- GROUP BY articles.author, title, articles.article_id;


SELECT comment_id, articles.votes, comments.created_at, comments.author, comments.body, articles.article_id FROM comments 
JOIN articles ON comments.article_id = articles.article_id WHERE articles.article_id = 1 ORDER BY comments.created_at DESC;