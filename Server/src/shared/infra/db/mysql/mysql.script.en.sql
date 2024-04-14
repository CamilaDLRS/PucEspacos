drop database if exists pucEspacos;

CREATE DATABASE pucEspacos;

USE pucEspacos;

CREATE TABLE tbCampuses (
    campusId Varchar(40) PRIMARY KEY,
    campusName Varchar(50) UNIQUE,
    createdDate Datetime,
    updatedDate Datetime
);

CREATE TABLE tbSchools (
    schoolId Varchar(40) PRIMARY KEY,
    nameSchool Varchar(50),
    createdDate Datetime,
    updatedDate Datetime
);

CREATE TABLE tbBuildings (
    buildingId Varchar(40) PRIMARY KEY,
    campusId Varchar(40),
    schoolId Varchar(40),
    buildingName Varchar(50),
    createdDate Datetime,
    updatedDate Datetime,
    foreign key (campusId) references tbCampuses(campusId),
    foreign key (schoolId) references tbSchools(schoolId)
);

CREATE TABLE tbFacilityTypes (
    facilityTypeId Varchar(40) PRIMARY KEY,
    facilityTypeDescription Varchar(70) UNIQUE
);

CREATE TABLE tbFacilities (
    facilityId Varchar(40) PRIMARY KEY, 
    buildingId Varchar(40),
    facilityTypeId Varchar(40),
    isActive Bool,
    facilityName Varchar(50),
    capacity Int,
    note Varchar(300),
    updatedDate Datetime,
    createdDate Datetime,
    foreign key (buildingId) references tbBuildings(buildingId),
    foreign key (facilityTypeId) references tbFacilityTypes(facilityTypeId)
);

CREATE TABLE tbAssets (
    assetId Varchar(40) PRIMARY KEY,
    assetDescription Varchar(50) UNIQUE
);

CREATE TABLE tbFacilityAssets (
    facilityId Varchar(40),
    assetId Varchar(40),
    quantity Int,
    createdDate Datetime,
    updatedDate Datetime,
    PRIMARY KEY (facilityId, assetId),
    foreign key (facilityId) references tbFacilities(facilityId),
    foreign key (assetId) references tbAssets(assetId)
);

CREATE TABLE tbUsers (
    userId Varchar(40) PRIMARY KEY,
    schoolId Varchar(40),
    email Varchar(50) UNIQUE,
    password Varchar(50),
    userName Varchar(100),
    userType Enum('Secretário','Docente','Discente','Administrador'),
    isActive Bool,
    createdDate Datetime,
    updatedDate Datetime,
    foreign key (schoolId) references tbSchools(schoolId)
);

CREATE TABLE tbReservations (
    reservationId Varchar(40) PRIMARY KEY,
    requestingUserId  Varchar(40),
    responsibleUserId Varchar(40),
    facilityId Varchar(40),
    reservationStatus Enum('Solicitada','Ativa','Cancelada','Em Andamento','Finalizada'),
    reservationPurpose Enum('Aula','Palestra','Lazer','Evento','Estudo','Outro'),
    checkinDate Datetime,
    checkoutDate Datetime,
    createdDate Datetime,
    updatedDate Datetime,
    foreign key (requestingUserId) references tbUsers(userId),
    foreign key (responsibleUserId) references tbUsers(userId),
    foreign key (facilityId) references tbFacilities(facilityId)
);

# ------------------------------Definição UUID---------------------------------------------------
-- Definição das constantes para campusId
SET @curitiba_uuid = UUID();
SET @londrina_uuid = UUID();

-- Definição das constantes para schoolId
SET @belas_artes_id = UUID();
SET @direito_id = UUID();
SET @educacao_humanidades_id = UUID();
SET @medicina_ciencias_vida_id = UUID();
SET @negocios_id = UUID();
SET @politecnica_id = UUID();

-- Definição das constantes para buildingId
SET @amarelo_uuid = UUID();
SET @azul_uuid = UUID();
SET @verde_uuid = UUID();
SET @laranja_uuid = UUID();
SET @vermelho5_uuid = UUID();
SET @vermelho6_uuid = UUID();
SET @usina_piloto_uuid = UUID();
SET @eletrica_uuid = UUID();
SET @mecanica_uuid = UUID();
SET @complexo_esportivo_uuid = UUID();
SET @ginasio_uuid = UUID();

-- Definição das constantes para facilityTypeId
SET @quadra_uuid = UUID();
SET @auditorio_uuid = UUID();
SET @sala_estudo_uuid = UUID();
SET @lab_informatica_uuid = UUID();
SET @sala_aula_uuid = UUID();

-- Definição das constantes para ativo_id
SET @ventilador_id = UUID();
SET @cadeira_id = UUID();
SET @projetor_id = UUID();
SET @quadro_branco_id = UUID();
SET @quadro_negro_id = UUID();
SET @computador_id = UUID();
SET @mesa_id = UUID();

-- Definição das constantes para userId
SET @joao_id = UUID();
SET @joana_id = UUID();
SET @maria_id = UUID();
SET @pedro_id = UUID();
SET @ana_id = UUID();
SET @lucia_id = UUID();
SET @andre_id = UUID();

-- Definição das constantes para facilityId
SET @espaco1 = UUID();
SET @espaco2 = UUID();
SET @espaco3 = UUID();
SET @espaco4 = UUID();

-- Definição das constantes para reservationId
SET @reserva1 = UUID();
SET @reserva2 = UUID();
SET @reserva3 = UUID();

# ------------------------------Inserções---------------------------------------------------

-- Inserção Campus
INSERT INTO tbCampuses (campusId, campusName, createdDate, updatedDate)
VALUES 
	(@curitiba_uuid, 'Curitiba', NOW(), NOW()),
	(@londrina_uuid, 'Londrina', NOW(), NOW());
    
-- Inserção Escolas
INSERT INTO tbSchools (schoolId, nameSchool, createdDate, updatedDate) 
VALUES
	(@belas_artes_id, 'Belas Artes', NOW(), NOW()),
	(@direito_id, 'Direito', NOW(), NOW()),
	(@educacao_humanidades_id, 'Educação e Humanidades', NOW(), NOW()),
	(@medicina_ciencias_vida_id, 'Medicina e Ciências da Vida - EMCV', NOW(), NOW()),
	(@negocios_id, 'Negócios', NOW(), NOW()),
	(@politecnica_id, 'Politécnica', NOW(), NOW());

-- Inserção Blocos Com Escola
INSERT INTO tbBuildings (buildingId, campusId, schoolId, buildingName, createdDate, updatedDate)
VALUES 
	(@amarelo_uuid, @curitiba_uuid, @educacao_humanidades_id, '1 - Amarelo', NOW(), NOW()),
	(@verde_uuid, @curitiba_uuid, @medicina_ciencias_vida_id, '3 - Verde', NOW(), NOW()),
	(@laranja_uuid, @curitiba_uuid, @negocios_id, '4 - Laranja', NOW(), NOW()),
	(@vermelho5_uuid, @curitiba_uuid, @direito_id, '5 - Vermelho', NOW(), NOW()),
	(@vermelho6_uuid, @curitiba_uuid, @medicina_ciencias_vida_id, '6 - Vermelho', NOW(), NOW()),
	(@usina_piloto_uuid, @curitiba_uuid, @politecnica_id, '7 - Usina Piloto', NOW(), NOW()),
	(@eletrica_uuid, @curitiba_uuid, @politecnica_id, '8 - Elétrica', NOW(), NOW()),
	(@mecanica_uuid, @curitiba_uuid, @politecnica_id, '9 - Mecânica', NOW(), NOW());

-- Inserção Blocos Sem Escola
INSERT INTO tbBuildings (buildingId, campusId, buildingName, createdDate, updatedDate)
VALUES 
	(@azul_uuid, @curitiba_uuid, '2 - Azul', NOW(), NOW()),
	(@complexo_esportivo_uuid, @curitiba_uuid, 'Complexo Esportivo', NOW(), NOW()),
	(@ginasio_uuid, @curitiba_uuid, 'Ginásio', NOW(), NOW());

-- Inserção Tipos de Espaços
INSERT INTO tbFacilityTypes (facilityTypeId, facilityTypeDescription) 
VALUES 
    (@quadra_uuid, 'Quadra Esportiva'),
    (@auditorio_uuid, 'Auditório'),
    (@sala_estudo_uuid, 'Sala de Estudo'),
    (@lab_informatica_uuid, 'Laboratório de Informática'),
    (@sala_aula_uuid, 'Sala de Aula');
    
-- Inserção Espaços
INSERT INTO tbFacilities (facilityId, buildingId, facilityTypeId, isActive, facilityName, capacity, note, updatedDate, createdDate)
VALUES 
	(@espaco1, @azul_uuid,  @lab_informatica_uuid, 1, 'Sala Grace Hopper', 80, null, NOW(), NOW()),
    (@espaco2, @azul_uuid,  @sala_aula_uuid, 1, 'Sala de Aula 17', 30, null, NOW(), NOW()),
    (@espaco3, @vermelho5_uuid,  @sala_aula_uuid, 1, 'Araça 303', 80, null, NOW(), NOW()),
    (@espaco4, @ginasio_uuid,  @quadra_uuid, 1, 'Quadra de volêi femenina 1', 80, null, NOW(), NOW());

-- Inserção Ativos
INSERT INTO tbAssets (assetId, assetDescription)
VALUES 
    (@ventilador_id, 'Ventilador'),
    (@cadeira_id, 'Cadeira'),
    (@projetor_id, 'Projetor'),
    (@quadro_branco_id, 'Quadro Branco'),
    (@quadro_negro_id, 'Quadro Negro'),
    (@computador_id, 'Computador'),
    (@mesa_id, 'Mesas');

-- Inserção Usuáios Sem Escola
INSERT INTO tbUsers ( userId, email, password, userName, userType, isActive, createdDate, updatedDate)
VALUES 
	(@maria_id, 'maria@pucpr.edu.br', 'password456', 'Maria', 'Discente', 1, NOW(), NOW()),
	(@pedro_id, 'pedro@pucpr.edu.br', 'password789', 'Pedro', 'Discente', 1, NOW(), NOW()),
	(@lucia_id, 'lucia@pucpr.br', 'password123', 'Lucia', 'Docente', 1, NOW(), NOW()),
	(@ana_id, 'ana@pucpr.edu.br', 'passwordabc', 'Ana', 'Administrador', 1, NOW(), NOW()),
    (@andre_id, 'andre@pucpr.edu.br', 'passworddef', 'Andre', 'Administrador', 1, NOW(), NOW());

-- Inserção Usuáios Com Escola
INSERT INTO tbUsers (userId, schoolId, email, password, userName, userType, isActive, createdDate, updatedDate)
VALUES 
	(@joao_id, @direito_id, 'joao@pucpr.br', 'password123', 'João', 'Secretário', 1, NOW(), NOW()),
	(@joana_id, @educacao_humanidades_id, 'joana@pucpr.br', 'password123', 'Joana', 'Secretário', 1, NOW(), NOW());
    

-- Inserção Reserva
INSERT INTO tbReservations (reservationId, requestingUserId, responsibleUserId, facilityId, reservationStatus, reservationPurpose, checkinDate, checkoutDate, createdDate, updatedDate)
VALUES 
	(@reserva1, @maria_id, @maria_id, @espaco1, 'Solicitada', 'Aula', '2024-03-24 07:50:00', '2024-03-24 09:20:00', NOW(), NOW()),
    (@reserva2, @pedro_id, @maria_id, @espaco2, 'Solicitada', 'Palestra', '2024-03-27 13:25:00', '2024-03-27 16:00:00', NOW(), NOW());
    
   select * from tbReservations;
    
-- Comandos Seleção
-- Ver Status das minhas reservas
select u.userName, r.reservationStatus
from tbUsers u, tbReservations r
where r.requestingUserId = u.userId AND
	  u.userId = @maria_id;

-- Ver quantas reservas que sou responsavel
select u.userName, count(*)
from tbUsers u, tbReservations r
where r.responsibleUserId = u.userId AND
	  u.userId = @maria_id;
      
-- Comandos Atualizar
-- Desativar Usuario
update tbUsers
set isActive = false
where userId = @maria_id;