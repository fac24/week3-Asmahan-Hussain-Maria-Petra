# Week 3 Project

Deployed App: https://fac-week3-project.herokuapp.com/

## About The Project

Movie Rating App

### Built With

- Programming Language: JS
- Backend: Node.js, Express
- DBMS: Postgresql
- Frontend: CSS, HTML
- (Testing: Cypress TBC)

## Getting Started


### Prerequisites


### Installation





## Usage

### Database Schema

Table: users

| Column        | Type          | Nullable | Notes    |
| ------------- | ------------- | -------- | -------- |
| id      | serial          | not null | PRIMARY KEY    |
| username           | text         |   | FOREIGN KEY     |
| email       | text          | not null |  unique  |
| password       | text          | not null |     |


Table: posts

| Column        | Type          | Nullable | Notes    |
| ------------- | ------------- | -------- | -------- |
| id      | serial          | not null | PRIMARY KEY    |
| user_id           | integer         |   | FOREIGN KEY  REFERENCES users(id) ON DELETE CASCADE  |
| movie_title        | text          |  |     |
| comment        | text          |  |     |
| rating        | text          |  |     |


Table: sessions

| Column        | Type          | Nullable | Notes    |
| ------------- | ------------- | -------- | -------- |
| sid      | text          |  | PRIMARY KEY    |
| email           | text         |  not null |      |




