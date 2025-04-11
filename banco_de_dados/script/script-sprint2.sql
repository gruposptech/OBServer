CREATE DATABASE observer;
USE observer;

CREATE TABLE cliente (
	idCliente INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR(100) NOT NULL,             
    cnpjEmpresa CHAR(14) NOT NULL,            
    emailEmpresa VARCHAR(100) NOT NULL,                    
    telefoneEmpresa CHAR(11) NOT NULL,                
    senhaEmpresa VARCHAR(20) NOT NULL,
    codigoCadastro VARCHAR(5) NOT NULL UNIQUE
);

CREATE TABLE rack (
	idRack INT PRIMARY KEY AUTO_INCREMENT,
    andar VARCHAR(45),
    corredor VARCHAR(45),
    sala VARCHAR(45),
    fkCliente INT,
    CONSTRAINT fkRackCliente FOREIGN KEY (fkCliente) REFERENCES cliente(idCliente)
);

CREATE TABLE parametros (
	idParams INT PRIMARY KEY AUTO_INCREMENT,
    tempMinIdeal DECIMAL(3,1) NOT NULL,
    tempMaxIdeal DECIMAL(3,1) NOT NULL,
    umidadeMinIdeal INT NOT NULL,
    umidadeMaxIdeal INT NOT NULL
);

CREATE TABLE sensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
    nomeSensor VARCHAR(45) NOT NULL,
    dataInstalacaoSensor DATE,
    statusSensor VARCHAR(10),
	fkRack INT,
    fkParametros INT DEFAULT 1,
    CONSTRAINT chkStatus CHECK (statusSensor IN ('Ativo', 'Inativo', 'Manutenção')),
	CONSTRAINT fkSensorRack FOREIGN KEY (fkRack) REFERENCES rack(idRack),
	CONSTRAINT fkSensorParams FOREIGN KEY (fkParametros) REFERENCES parametros(idParams)
);

CREATE TABLE leitura (
	idLeitura INT AUTO_INCREMENT,
    fkSensor INT,
    CONSTRAINT pkComposta PRIMARY KEY (idLeitura, fkSensor),
    umidade INT,
    temperatura DECIMAL(3,1),
    dataHoraLeitura DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkLeituraSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

CREATE TABLE alerta (
	idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    tipoAlerta VARCHAR(21),
    dataHoraAlerta DATETIME NOT NULL,
    statusAlerta CHAR(9) NOT NULL,
    fkLeitura INT, 
    fkSensor INT,
    CONSTRAINT chkTipoAlerta CHECK (tipoAlerta IN ('Temperatura', 'Umidade', 'Temperatura e Umidade')),
	CONSTRAINT chkStatusAlerta CHECK (statusAlerta IN ('Pendente', 'Resolvido')),
	CONSTRAINT fkAlertaLeitura FOREIGN KEY (fkLeitura) REFERENCES leitura(idLeitura),
    CONSTRAINT fkAlertaSensor FOREIGN KEY (fkSensor) REFERENCES leitura(fkSensor)
);

INSERT INTO parametros (tempMinIdeal, tempMaxIdeal, umidadeMinIdeal, umidadeMaxIdeal) VALUES
	(18.0, 27.0, 40, 55);


INSERT INTO cliente (nomeEmpresa, cnpjEmpresa, emailEmpresa, telefoneEmpresa, senhaEmpresa, codigoCadastro) VALUES
	('Ifood', '12345678000101', 'ifood@empresa.com', '11987654321', 'ifood#2024', 'Ax#0U'),
    ('Unimed', '98765432000123', 'unimed@empresa.com', '11998765432', 'unimed@@med', 'Pb%3A'),
    ('Itaú', '45678901000134', 'itauunibanco@empresa.com', '11912345678', 'iT4u@banc0', 'Je*7C');

INSERT INTO rack (andar, corredor, sala, fkCliente) VALUES 
	('1º andar', '2', '2A', 1),
	('2º andar', '3', '3A', 2),
	('3º andar', '4', '4A', 3);

INSERT INTO sensor (nomeSensor, statusSensor, fkRack) VALUES
	('Sensor A1', 'Ativo', 1),
    ('Sensor A2', 'Ativo', 1),
    ('Sensor B1', 'Ativo', 2),
    ('Sensor B2', 'Inativo', 2),
    ('Sensor H3', 'Inativo', 3),
    ('Sensor H4','Manutenção', 3);
    
INSERT INTO leitura(umidade, temperatura, fkSensor) VALUES
	(30, 19.0, 1),
    (30, 28.0, 2),
	(45, 20.0, 5);
    

INSERT INTO alerta (dataHoraAlerta, statusAlerta, fkLeitura) VALUES
    ('2025-04-02 11:00:00', 'Pendente', 1),
    ('2025-05-02 12:00:00', 'Pendente', 2),
	('2025-06-30 13:45:00', 'Pendente', 3);
    

SELECT 
        s.nomeSensor 'Nome do Sensor',
        ifnull(l.umidade, 'Dentro dos padrões') 'Umidade atingida',
        ifnull(l.temperatura, 'Dentro dos padrões') 'Temperatura atingida',
        ifnull(a.dataHoraAlerta, 'Sem alerta') 'Data e hora do alerta',
        ifnull(a.statusAlerta, 'Sem alerta') 'Status do alerta',
        CASE
        WHEN (l.umidade > p.umidadeMaxIdeal OR l.umidade < p.umidadeMinIdeal) AND (l.temperatura > p.tempMaxIdeal OR l.temperatura < p.tempMinIdeal) THEN 'Temperatura e Umidade'
        WHEN l.umidade > p.umidadeMaxIdeal OR l.umidade < p.umidadeMinIdeal THEN 'Umidade'
        WHEN l.temperatura > p.tempMaxIdeal OR l.temperatura < p.tempMinIdeal THEN 'Temperatura'
        ELSE 'Sem problemas.' END 'Tipo do alerta'
        FROM sensor s
			JOIN parametros p ON s.fkParametros = p.idParams
				JOIN leitura l ON l.fkSensor = s.idSensor
					JOIN alerta a ON a.fkLeitura = l.idLeitura;