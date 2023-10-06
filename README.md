# Northcoders News API



You can find the hosted API here: https://be-nc-news-sopv.onrender.com

This project offers a number of endpoints to access users, articles and comments from a database.

Dependencies required include:
    devDependencies:
        jest
        jest-extended
        jest-sorted
        pg-format
        supertest
    dependencies:
        dotenv
        express
        pg

Each can be installed with npm i "dependency here" using -D if installing a dev dependency

Use scripts:
    npm run setup-dbs
    npm run seed
To setup and seed the databases


Two .env files are required:
    .env.devlopment: PGDATABASE=nc_news
    .env.test: PGDABASE=nc_news_test


This project requires minimum versions of Node and Postgres:
    Node: v20.5.1
    Psql: v14.9


