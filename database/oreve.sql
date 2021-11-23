CREATE DATABASE oreve;
-- USE oreve;

CREATE TABLE eventos(
	id int AUTO_INCREMENT NOT NULL,
    nombre varchar(250) NOT NULL,
    ubicacion varchar(300) NOT NULL,
	creador int NOT NULL REFERENCES usuarios(id),
    hora_inicio datetime,
    hora_fin datetime,
    fecha_inicio date,
    fecha_fin date,
    participantes bigint DEFAULT 0,
    estado tinyint DEFAULT 1,
    descripcion varchar(300),
    PRIMARY KEY (id)
);

CREATE TABLE usuarios(
	id int AUTO_INCREMENT NOT NULL,
    nombre varchar(150) NOT NULL,
    ap_paterno varchar(50) NOT NULL,
    ap_materno varchar(50),
    correo varchar(200) NOT NULL,
    keyword varchar(15) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (correo)
);