create table users
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(191) NOT NULL,
  password VARCHAR(60) NOT NULL,
  email VARCHAR(191) NOT NULL,
  CONSTRAINT users_email_unique
    UNIQUE (email)
);

create table posts
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(2000) NOT NULL,
  text VARCHAR NULL,
  author_id VARCHAR(24) NOT NULL,
  created_at DATETIME NOT NULL,
  CONSTRAINT posts_author_id
    FOREIGN KEY(author_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT posts_id
    UNIQUE (id)
);

create table tags
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(191) NOT NULL,
  description VARCHAR NULL,
);

create table posts_tags
(
  id VARCHAR(24) NOT NULL PRIMARY KEY,
  post_id VARCHAR(24) NOT NULL,
  tag_id VARCHAR(24) NOT NULL,
  CONSTRAINT posts_tags_post_id_foreign
    FOREIGN KEY (post_id) REFERENCES posts (id),
  CONSTRAINT posts_tags_tag_id_foreign
    FOREIGN KEY (tag_id) REFERENCES tags (id)
);

create table posts_authors
(
  id VARCHAR(24) NOT NULL PRIMARY KEY,
  post_id VARCHAR(24) NOT NULL,
  author_id VARCHAR(24) NOT NULL,
  CONSTRAINT posts_authors_author_id_foreign
    FOREIGN KEY (author_id) REFERENCES users (id),
  CONSTRAINT posts_authors_post_id_foreign
    FOREIGN KEY (post_id) REFERENCES posts (id)
);