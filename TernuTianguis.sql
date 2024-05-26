create database TernuTianguis;

create user 'adminTernu'@'localhost' identified by 'TernuTianguis.Admin2024';
grant all privileges on TernuTianguis.* to 'adminTernu'@'localhost'
with grant option;


use TernuTianguis;

CREATE TABLE `Compradores`(
    `idComprador` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(200) NOT NULL,
    `apPat` VARCHAR(200) NOT NULL,
    `apMat` VARCHAR(200),
    `usuario` VARCHAR(50) NOT NULL,
    `contrasena` VARCHAR(64) NOT NULL,
    `telefono` VARCHAR(45) NOT NULL,
    `correo` VARCHAR(45) NOT NULL,
    `fotoDePerfil` longblob,
    PRIMARY KEY (`idComprador`),
    UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Vendedores`(
    `idVendedor` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(200) NOT NULL,
    `apPat` VARCHAR(200) NOT NULL,
    `apMat` VARCHAR(200),
    `usuario` VARCHAR(50) NOT NULL,
    `contrasena` VARCHAR(64) NOT NULL,
    `telefono` VARCHAR(45) NOT NULL,
    `correo` VARCHAR(45) NOT NULL,
    `fotoDePerfil` longblob,
    PRIMARY KEY (`idVendedor`),
    UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Productos`(
    `idProducto` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(200) NOT NULL,
    `descripcion` VARCHAR(200) NOT NULL,
    `precio` DECIMAL(10,2) NOT NULL,
    `foto` longblob,
    `cantidad` INT NOT NULL DEFAULT 0,
    `categoria` VARCHAR(200) NOT NULL,
    `idVendedor` INT NOT NULL,
    PRIMARY KEY (`idProducto`),
    FOREIGN KEY (`idVendedor`) REFERENCES `Vendedores`(`idVendedor`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `Comentarios`(
    `idComentario` INT NOT NULL AUTO_INCREMENT,
    `comentario` VARCHAR(200) NOT NULL,
    `calificacion` INT NOT NULL,
    `idProducto` INT NOT NULL,
    `idComprador` INT NOT NULL,
    PRIMARY KEY (`idComentario`),
    FOREIGN KEY (`idProducto`) REFERENCES `Productos`(`idProducto`),
    FOREIGN KEY (`idComprador`) REFERENCES `Compradores`(`idComprador`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




