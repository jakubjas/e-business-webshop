# --- !Ups

CREATE TABLE ProductTypes (
 typeId INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(255) NOT NULL,
 PRIMARY KEY(typeId)
);

# --- !Downs

DROP TABLE ProductTypes;