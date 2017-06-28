# --- !Ups

CREATE TABLE ShippingMethods (
 shippingMetId INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(255) NOT NULL,
 price INT NOT NULL,
 PRIMARY KEY(shippingMetId)
);

# --- !Downs

DROP TABLE ShippingMethods;