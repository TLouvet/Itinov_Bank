CREATE DATABASE IF NOT EXISTS `itinov_bank_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `itinov_bank_test`;

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
  (741.35, 'FR123456789',0, 1, 1, 1), 
  (12400, 'FR123456788', 0, 2, 1, 1), 
  (-850.41, 'FR123456787', 0, 3, 1, 1),
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
  (1, 1, 'Initial deposit', 741.35, '2024-04-01'),
  (2, 1, 'Initial deposit', 12400, '2021-04-01'),
  (3, 1, 'Initial deposit', -850.41, '2021-04-01'),
  (4, 1, 'Initial deposit', 0, '2021-04-01'),
  (3, 1, 'Online shopping', 45.20, '2024-04-02'), 
  (3, 2, 'Grocery purchase', -120.00, '2024-04-03'), 
  (3, 3, 'Salary deposit', 150.00, '2024-04-05'), 
  (3, 1, 'Coffee shop', 4.50, '2024-04-07'), 
  (3, 1, 'Lunch with friends', 25.00, '2024-04-10'), 
  (3, 3, 'Bonus received', 100.00, '2024-04-12'), 
  (3, 2, 'Electricity bill', -85.00, '2024-04-15'), 
  (3, 1, 'Dinner out', 60.00, '2024-04-18'), 
  (3, 1, 'Movie ticket', 12.50, '2024-04-21'), 
  (3, 3, 'Freelance income', 180.00, '2024-04-25')
  