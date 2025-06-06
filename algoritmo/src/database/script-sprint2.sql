CREATE DATABASE IF NOT EXISTS observer;
USE observer;

CREATE TABLE IF NOT EXISTS empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR(100) NOT NULL,             
    cnpjEmpresa CHAR(14) NOT NULL UNIQUE,            
    emailEmpresa VARCHAR(100) NOT NULL,                                   
    codigoCadastro CHAR(5) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuario (
    idUsuario INT AUTO_INCREMENT,
    fkEmpresa INT,
    nomeUsuario VARCHAR(45) NOT NULL,
    emailUsuario VARCHAR(100) NOT NULL,
    senhaUsuario VARCHAR(20) NOT NULL,
    cargo VARCHAR(45) NOT NULL,
    codigoCadastro CHAR(5) NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    PRIMARY KEY (idUsuario, fkEmpresa)
);

CREATE TABLE IF NOT EXISTS rack (
	idRack INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(45) not null,
    fkEmpresa INT,
    CONSTRAINT fkRackEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE IF NOT EXISTS parametros (
	idParams INT PRIMARY KEY AUTO_INCREMENT,
    tempMinIdeal DECIMAL(3,1) NOT NULL,
    tempMaxIdeal DECIMAL(3,1) NOT NULL,
    umidadeMinIdeal INT NOT NULL,
    umidadeMaxIdeal INT NOT NULL,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEMpresa)
);

CREATE TABLE IF NOT EXISTS sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    nomeSensor VARCHAR(45) NOT NULL,
    dataInstalacaoSensor DATE,
    statusSensor VARCHAR(10),
    fkRack INT,
    fkParametros INT DEFAULT 1,
    CONSTRAINT chkStatus CHECK (statusSensor IN ('Ativo' , 'Inativo', 'Manutenção')),
    CONSTRAINT fkSensorRack FOREIGN KEY (fkRack)
        REFERENCES rack (idRack),
    CONSTRAINT fkSensorParams FOREIGN KEY (fkParametros)
        REFERENCES parametros (idParams)
);

CREATE TABLE IF NOT EXISTS leitura (
	idLeitura INT AUTO_INCREMENT,
    fkSensor INT,
    CONSTRAINT pkComposta PRIMARY KEY (idLeitura, fkSensor),
    umidade INT,
    temperatura DECIMAL(3,1),
    dataHoraLeitura DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkLeituraSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

CREATE TABLE IF NOT EXISTS alerta (
	idAlerta INT AUTO_INCREMENT,
    tipoAlerta VARCHAR(45),
    statusAlerta CHAR(9) NOT NULL,
    fkLeitura INT, 
    fkSensor INT,
    PRIMARY KEY (idAlerta, fkLeitura, fkSensor),
	CONSTRAINT chkStatusAlerta CHECK (statusAlerta IN ('Pendente', 'Resolvido')),
	CONSTRAINT fkAlertaLeitura FOREIGN KEY (fkLeitura) REFERENCES leitura(idLeitura),
    CONSTRAINT fkAlertaSensor FOREIGN KEY (fkSensor) REFERENCES leitura(fkSensor)
);

INSERT INTO empresa VALUES 
	(default, 'XPTO Tech', '12345678000101', 'xptotech@email.com', 'ab3de');
    
INSERT INTO rack VALUES 
	(default, 'Rack 01', 1), 
    (default, 'Rack 02', 1), 
    (default, 'Rack 03', 1), 
    (default, 'Rack 04', 1);
    
INSERT INTO sensor VALUES 
	(default, 'Sensor 1', '2025-01-01', 'Ativo', 1, null),
    (default, 'Sensor 2', '2025-01-01', 'Inativo', 1, null),
    (default, 'Sensor 3', '2025-01-01', 'Ativo', 1, null);
    