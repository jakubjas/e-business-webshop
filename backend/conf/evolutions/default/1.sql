# --- !Ups

CREATE TABLE Categories (
 catId INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(255) NOT NULL,
 PRIMARY KEY(catId)
);

# --- !Downs

DROP TABLE Categories;