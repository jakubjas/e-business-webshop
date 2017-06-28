# --- !Ups

CREATE TABLE PaymentMethods (
 paymentMetId INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(255) NOT NULL,
 PRIMARY KEY(paymentMetId)
);

# --- !Downs

DROP TABLE PaymentMethods;