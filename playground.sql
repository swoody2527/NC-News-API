\c nc_news

SELECT * FROM articles;
SELECT * FROM comments;

SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, 
COUNT(comments.comment_id) AS comment_count  
FROM articles JOIN comments ON articles.article_id = comments.article_id 
GROUP BY articles.author, title, articles.article_id;