CREATE DATABASE IF NOT EXISTS `itinov_bank` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `itinov_bank`;

CREATE TABLE IF NOT EXISTS `bank` (
    `bank_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO `bank` (`name`) VALUES ('Itinov Bank');

CREATE TABLE IF NOT EXISTS `currency` (
    `currency_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO `currency` (`name`) VALUES ('EUR');

CREATE TABLE IF NOT EXISTS `transaction_type` (
    `transaction_type_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO `transaction_type` (`name`) VALUES ('Deposit'), ('Withdrawal'), ('Transfer');

CREATE TABLE IF NOT EXISTS `account_type` (
    `acc_type_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO `account_type` (`name`) VALUES ('Compte épargne'), ('Livret A'), ('Compte courant');

CREATE TABLE IF NOT EXISTS `customer` (
    `customer_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `civility` VARCHAR(10) NOT NULL
);

INSERT INTO `customer` (`first_name`, `last_name`, `civility`) VALUES ('John', 'Doe', 'Mr'), ('Jane', 'Doe', 'Mrs');

CREATE TABLE IF NOT EXISTS `account` (
    `account_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
    `balance` DECIMAL(10, 2) NOT NULL,
    `max_overdraft` INTEGER DEFAULT 0 CHECK (max_overdraft >= 0), 
    `account_number` VARCHAR(255) NOT NULL,
    `account_type_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `bank_id` INTEGER NOT NULL,
    FOREIGN KEY (`bank_id`) REFERENCES `bank`(`bank_id`),
    FOREIGN KEY (`account_type_id`) REFERENCES `account_type`(`acc_type_id`),
    FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`)
);

INSERT INTO `account` (`balance`,  `account_number`, `max_overdraft`,  `account_type_id`, `customer_id`, `bank_id`) 
VALUES 
  (340.67, 'FR123456789', 400, 1, 1, 1), 
  (13200.2, 'FR123456788', 0, 2, 1, 1), 
  (-150.41, 'FR123456787', 100, 3, 1, 1),
  (0, 'FR123456786', 0, 3, 2, 1);


CREATE TABLE IF NOT EXISTS `transaction` (
    `transaction_id` INTEGER AUTO_INCREMENT PRIMARY KEY,
    `account_id` INTEGER NOT NULL,
    `transaction_type_id` INTEGER NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `date` DATE NOT NULL,
    FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`),
    FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_type`(`transaction_type_id`)
);

INSERT INTO `transaction` (`account_id`, `transaction_type_id`, `description`, `amount`, `date`)
VALUES 
  (1, 1, 'Dépôt initial', 741.35, '2024-04-01'),
  (2, 1, 'Dépôt initial', 12400, '2024-04-01'),
  (3, 1, 'Dépôt initial', -850.41, '2024-04-01'),
  (4, 1, 'Dépôt initial', 0, '2024-04-01'),
  (3, 2, 'Achat en ligne', -45.20, '2024-04-02'), 
  (3, 2, "Achat d'épicerie", -120.00, '2024-04-03'), 
  (3, 1, 'Dépôt de salaire', 150.00, '2024-04-05'), 
  (3, 2, 'Café', -4.50, '2024-04-07'), 
  (3, 2, 'Déjeuner entre amis', -25.00, '2024-04-10'), 
  (3, 1, 'Prime reçue', 100.00, '2024-04-12'), 
  (3, 2, "Facture d'électricité", -85.00, '2024-04-15'), 
  (3, 2, "Dîner à l'extérieur", -60.00, '2024-04-18'), 
  (3, 2, 'Billet de cinéma', -12.50, '2024-04-21'), 
  (3, 1, 'Revenu freelance', 180.00, '2024-04-25'),
  (2, 1, 'Dépôt sur livret', 500, '2024-04-02'),
  (2, 1, 'Epargne', 300, '2024-04-05'),
  (2, 1, 'Dépôt sur livret', 700, '2024-04-08'),
  (2, 1, 'Epargne', 250, '2024-04-12'),
  (2, 1, 'Dépôt sur livret', 400, '2024-04-15'),
  (2, 1, 'Epargne', 600, '2024-04-20'),
  (2, 1, 'Dépôt sur livret', 450, '2024-04-25'),
  (2, 2, 'Retrait vacances', 800, "2024-04-27"),
  (1, 2, 'Achat', -120, '2024-04-08'),
  (1, 1, 'Dépôt', 250, '2024-04-12'),
  (1, 2, 'Facture', -400, '2024-04-15'),
  (1, 2, 'Achat en ligne', -450, '2024-04-25'),
  (1, 2, 'Déjeuner', -150, '2024-04-30'),
  (1, 2, 'Supermarché', -200, '2024-04-03'),
  (1, 2, 'Essence', -60, '2024-04-10'),
  (1, 2, 'Restaurant', -80, '2024-04-17'),
  (1, 2, 'Cinéma', -30, '2024-04-22'),
  (1, 2, 'Shopping', -180, '2024-04-27'),
  (1,3, 'Virement', -200, '2024-04-10'),
  (3,3, 'Virement', 300, '2024-04-20');  