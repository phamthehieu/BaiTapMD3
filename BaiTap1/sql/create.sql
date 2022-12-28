CREATE database BaiTap_DataBase;
USE BaiTap_DataBase;
CREATE TABLE product (
                         id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                         name VARCHAR(100),
                         price INT NOT NULL ,
                         description varchar(255)
);