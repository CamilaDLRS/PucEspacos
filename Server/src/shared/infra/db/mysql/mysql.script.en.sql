DROP DATABASE IF EXISTS pucEspacos; 

CREATE DATABASE pucEspacos;

USE pucEspacos;

CREATE TABLE tbCampuses (
    campusId Varchar(40) PRIMARY KEY,
    campusName Varchar(50) UNIQUE,
    createdDate BIGINT,
    updatedDate BIGINT
);

CREATE TABLE tbSchools (
    schoolId Varchar(40) PRIMARY KEY,
    nameSchool Varchar(50),
    createdDate BIGINT,
    updatedDate BIGINT
);

CREATE TABLE tbBuildings (
    buildingId Varchar(40) PRIMARY KEY,
    campusId Varchar(40),
    schoolId Varchar(40),
    buildingName Varchar(50),
    createdDate BIGINT,
    updatedDate BIGINT,
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
    updatedDate BIGINT,
    createdDate BIGINT,
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
    createdDate BIGINT,
    updatedDate BIGINT,
    PRIMARY KEY (facilityId, assetId),
    foreign key (facilityId) references tbFacilities(facilityId),
    foreign key (assetId) references tbAssets(assetId)
);

CREATE TABLE tbUsers (
    userId Varchar(40) PRIMARY KEY,
    schoolId Varchar(40),
    email Varchar(50) UNIQUE,
    password Varchar(200),
    userName Varchar(100),
    userType Enum('Secretário','Docente','Discente','Administrador'),
    isActive Bool,
    createdDate BIGINT,
    updatedDate BIGINT,
    foreign key (schoolId) references tbSchools(schoolId)
);

CREATE TABLE tbReservations (
    reservationId Varchar(40) PRIMARY KEY,
    requestingUserId  Varchar(40),
    responsibleUserId Varchar(40),
    facilityId Varchar(40),
    reservationStatus Enum('Solicitada','Aprovada'),
    reservationPurpose Enum('Aula','Palestra','Lazer','Evento','Estudo','Outro'),
    checkinDate BIGINT,
    checkoutDate BIGINT,
    createdDate BIGINT,
    updatedDate BIGINT,
    foreign key (requestingUserId) references tbUsers(userId),
    foreign key (responsibleUserId) references tbUsers(userId),
    foreign key (facilityId) references tbFacilities(facilityId)
);

# ------------------------------Definição UUID---------------------------------------------------
-- Definição das constantes para campusId
SET @curitiba_uuid = '2c897776-8803-49e5-a7a9-5230af79a1a3';
SET @londrina_uuid = 'f09c1739-7130-42e2-88b2-f969161811b3';

-- Definição das constantes para schoolId
SET @belas_artes_id = '6aa77de0-cfd4-43d8-9b72-2e340ee3aa4e';
SET @direito_id = '43c96ad4-ba36-434c-87b2-06c3bc8983d4';
SET @educacao_humanidades_id = 'd9c7db2c-9d4f-465e-9521-b4afa88869f5';
SET @medicina_ciencias_vida_id = '6b72ea20-8ba4-4559-8900-3dc92ad0baf7';
SET @negocios_id = '2666e2e0-8e72-416b-9198-61eceb2a143d';
SET @politecnica_id = 'f5086573-db57-43ef-9fb1-6838d6f1280b';

-- Definição das constantes para buildingId
SET @amarelo_uuid = 'ebb44a25-b7f1-408b-bbde-f829326ae23b';
SET @azul_uuid = '376d163d-e00b-40e6-8857-f402e2feb6a8';
SET @verde_uuid = '24ae3160-4d20-4ff4-9449-8a04103f3b12';
SET @laranja_uuid = '1d5b7102-8342-490e-8cd2-7d120bd9d77e';
SET @vermelho5_uuid = '99b804af-68a1-409b-96e4-19e79a9100c9';
SET @vermelho6_uuid = '4c4f833b-cb09-430f-985d-61edc02fe8da';
SET @usina_piloto_uuid = '09393867-bff7-4be9-96f4-e262d5ea04de';
SET @eletrica_uuid = 'b2c555b6-2f89-45c3-91a8-b946a28a3a16';
SET @mecanica_uuid = '69827e00-eb69-4137-bf06-be4fd0c00dce';
SET @complexo_esportivo_uuid = '207955d9-b5b9-4727-9ac0-aee43b326476';
SET @ginasio_uuid = '2e864359-4977-4b2a-bd96-180a3aeff0c5';

-- Definição das constantes para facilityTypeId
SET @quadra_uuid = '0423b3e6-1244-4cf6-836e-e052d4b6ddb8';
SET @auditorio_uuid = '67ad98ea-f161-4047-977b-73b6090dd5b6';
SET @sala_estudo_uuid = 'afea0592-c942-4178-b967-012b1bfb50e7';
SET @lab_informatica_uuid = 'f58d3ad6-17f4-4f13-9cab-96a3caef3b3b';
SET @sala_aula_uuid = 'ceb542b3-26de-4c9c-bfd3-a57f06f6fc14';

-- Definição das constantes para ativo_id
SET @ventilador_id = 'a96e61e3-1b29-420d-9a50-96227cf74664';
SET @cadeira_id = '9f03a1a6-992c-46a1-8c8e-eafee56dab62';
SET @projetor_id = '59d57938-b93a-4c12-9963-d5ce949368ad';
SET @quadro_branco_id = '30fd6c86-70e1-4308-acd1-f9b7c8673748';
SET @quadro_negro_id = '0cad06ac-51a0-4be0-8e66-3f8d3652393a';
SET @computador_id = 'c499ca7a-4fe1-4fc5-8399-26f31357f3b8';
SET @mesa_id = '9d3979ca-d7fb-4817-b909-0c0338623174';

-- Definição das constantes para userId
SET @joao_id = '13a3c1a5-47cd-4930-89ad-6fcc604c0363';
SET @joana_id = 'c0c9a632-f200-4554-81d1-f79d6a4778ac';
SET @vera_id = 'bd8d2e39-ca96-41d1-92c7-21eba1adcde9';
SET @maria_id = 'b2cb9978-4a50-4393-9985-eb8fad46f5f1';
SET @pedro_id = 'eaeead9d-75fe-48e9-a4b5-d2faaa796101';
SET @camila_id = 'd8cd1c16-4960-461d-a781-5d51e6e20105';
SET @lucia_id = '212270a5-cc6f-4040-a149-b44efc24e1a8';
SET @dimitri_id = '168600d3-ee42-4274-8756-80a4110e7d8b';

-- Definição das constantes para facilityId
SET @espaco1 = '90c7e06f-bb73-454e-8114-0b7e556677a6';
SET @espaco2 = '250677f9-3122-44bf-bde9-1b2f9f81b35c';
SET @espaco3 = 'd8ccc4e3-7636-4d35-a7ac-b18231ed8ee5';
SET @espaco4 = 'eebe82c7-eb90-4d82-b70d-6f7fafd2f758';
SET @espaco5 = 'eebe82c7-eb90-4d82-b70d-347fafd27854';
SET @espaco6 = 'e5e39abd-1554-477f-8786-6aa1741127c3';
SET @espaco7 = '2654ff1d-42d4-4f04-95f6-4e2800edc521';
SET @espaco8 = 'cea48e9e-4921-4460-ae31-3bbcf56e4e08';
SET @espaco9 = '902f2579-c89d-49c6-a3aa-1e5b96c19371';
SET @espaco10 = '0ffa2772-5bcf-4ca0-a8f8-1f8df4a3c334';

-- Definição das constantes para reservationId
SET @reserva1 = '0cbe9db4-6bf3-43d8-bb73-9a2e2cb9fe3f';
SET @reserva2 = '61646500-1c40-43f8-a3bd-31b7a5681ed7';
SET @reserva3 = '9b119a18-663a-4318-a0a4-75779c122e6a';

# ------------------------------Inserções---------------------------------------------------

-- Inserção Campus
INSERT INTO tbCampuses (campusId, campusName, createdDate, updatedDate)
VALUES 
	(@curitiba_uuid, 'Curitiba', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@londrina_uuid, 'Londrina', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000);
    
-- Inserção Escolas
INSERT INTO tbSchools (schoolId, nameSchool, createdDate, updatedDate) 
VALUES
	(@belas_artes_id, 'Belas Artes', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@direito_id, 'Direito', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@educacao_humanidades_id, 'Educação e Humanidades', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@medicina_ciencias_vida_id, 'Medicina e Ciências da Vida - EMCV', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@negocios_id, 'Negócios', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@politecnica_id, 'Politécnica', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000);

-- Inserção Blocos Com Escola
INSERT INTO tbBuildings (buildingId, campusId, schoolId, buildingName, createdDate, updatedDate)
VALUES 
	(@amarelo_uuid, @curitiba_uuid, @educacao_humanidades_id, '1 - Amarelo', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@verde_uuid, @curitiba_uuid, @medicina_ciencias_vida_id, '3 - Verde', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@laranja_uuid, @curitiba_uuid, @negocios_id, '4 - Laranja', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@vermelho5_uuid, @curitiba_uuid, @direito_id, '5 - Vermelho', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@vermelho6_uuid, @curitiba_uuid, @medicina_ciencias_vida_id, '6 - Vermelho', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@usina_piloto_uuid, @curitiba_uuid, @politecnica_id, '7 - Usina Piloto', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@eletrica_uuid, @curitiba_uuid, @politecnica_id, '8 - Elétrica', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@mecanica_uuid, @curitiba_uuid, @politecnica_id, '9 - Mecânica', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000);

-- Inserção Blocos Sem Escola
INSERT INTO tbBuildings (buildingId, campusId, buildingName, createdDate, updatedDate)
VALUES 
	(@azul_uuid, @curitiba_uuid, '2 - Azul', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@complexo_esportivo_uuid, @curitiba_uuid, 'Complexo Esportivo', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@ginasio_uuid, @curitiba_uuid, 'Ginásio', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000);

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
	(@espaco1, @azul_uuid,  @lab_informatica_uuid, 1, 'Sala Grace Hopper', 80, 'Janela qubrada.', UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
    (@espaco2, @azul_uuid,  @sala_aula_uuid, 1, 'Sala de Aula 2', 30, null, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
    (@espaco3, @vermelho5_uuid,  @sala_aula_uuid, 1, 'Araça 303', 80, null, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
    (@espaco4, @ginasio_uuid,  @quadra_uuid, 1, 'Quadra de volêi femenina 1', null, null, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
    (@espaco5, @amarelo_uuid,  @auditorio_uuid, 1, 'Sala de realizada aumentada', 25, null, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000), 
    (@espaco6, @azul_uuid,  @sala_estudo_uuid, 1, 'Sala de Estudos 2', 2, null, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
    (@espaco7, @azul_uuid,  @sala_aula_uuid, 1, 'Sala de Aula 7', 60, null, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
    (@espaco8, @azul_uuid,  @sala_aula_uuid, 1, 'Sala de Aula 8', 60, null, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000), 
    (@espaco9, @azul_uuid,  @sala_aula_uuid, 1, 'Sala de Aula 9', 60, null, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
    (@espaco10, @azul_uuid,  @sala_aula_uuid, 1, 'Sala de Aula 10', 60, null, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000);
   
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
   
-- Inserção Ativos Espaços
INSERT INTO tbFacilityAssets (facilityId, assetId, quantity, updatedDate, createdDate)
VALUES 
	(@espaco1, @ventilador_id, 3, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@espaco1, @cadeira_id, 20, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@espaco2, @quadro_branco_id, 2, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@espaco3, @computador_id, 35, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@espaco3, @projetor_id, 2, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@espaco3, @mesa_id, 20, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000);

-- Inserção Usuáios Sem Escola
INSERT INTO tbUsers ( userId, email, password, userName, userType, isActive, createdDate, updatedDate)
VALUES 
	(@maria_id, 'maria@pucpr.edu.br', ' ', 'Maria', 'Discente', 1, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@pedro_id, 'pedro@pucpr.edu.br', '880b056f8d68c94a411c21a9fc8084cfa55d9ec18c8d5156524e64ade2795ed3', 'Pedro', 'Discente', 1, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@lucia_id, 'lucia@pucpr.br', '880b056f8d68c94a411c21a9fc8084cfa55d9ec18c8d5156524e64ade2795ed3', 'Lucia', 'Docente', 1, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@vera_id, 'vera@pucpr.br', '880b056f8d68c94a411c21a9fc8084cfa55d9ec18c8d5156524e64ade2795ed3', 'Vera', 'Docente', 1, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@camila_id, 'camila@pucpr.br', '880b056f8d68c94a411c21a9fc8084cfa55d9ec18c8d5156524e64ade2795ed3', 'Camila', 'Administrador', 1, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
    (@dimitri_id, 'dimitri@pucpr.br', '880b056f8d68c94a411c21a9fc8084cfa55d9ec18c8d5156524e64ade2795ed3', 'Dimitri', 'Administrador', 1, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000);

-- Inserção Usuáios Com Escola
INSERT INTO tbUsers (userId, schoolId, email, password, userName, userType, isActive, createdDate, updatedDate)
VALUES 
	(@joao_id, @direito_id, 'joao@pucpr.br', '880b056f8d68c94a411c21a9fc8084cfa55d9ec18c8d5156524e64ade2795ed3', 'João', 'Secretário', 1, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
	(@joana_id, @educacao_humanidades_id, 'joana@pucpr.br', '880b056f8d68c94a411c21a9fc8084cfa55d9ec18c8d5156524e64ade2795ed3', 'Joana', 'Secretário', 1, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000);
    

-- Inserção Reserva
INSERT INTO tbReservations (reservationId, requestingUserId, responsibleUserId, facilityId, reservationStatus, reservationPurpose, checkinDate, checkoutDate, createdDate, updatedDate)
VALUES 
	(@reserva1, @maria_id, @lucia_id, @espaco1, 'Aprovada', 'Aula', 1711277400000, 1711282800000, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
    (@reserva2, NULL, @lucia_id, @espaco2, 'Aprovada', 'Palestra', 1711556700000, 1711566000000, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('6c7b5e7c-2682-4962-a92d-0c359e147779', @maria_id, @lucia_id, @espaco2, 'Aprovada', 'Aula', 1711795800000, 1711795800000, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000), 
    ('0b668249-0526-40da-832d-c5ac9d54e6fc', NULL, @lucia_id, @espaco6, 'Aprovada', 'Aula', 1711968600000, 1711974000000, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('4c1a3fc4-45d8-4ee6-a2af-5ae43290ed5e', @maria_id, @lucia_id, @espaco3, 'Aprovada', 'Estudo', 1711364400000, 1711371600000, 1711363800000, UNIX_TIMESTAMP(NOW()) * 1000), 
    ('0ec826a2-60d7-4b51-9b7d-c5ac0b9e92e4', NULL, @camila_id, @espaco4, 'Aprovada', 'Evento', 1716742800000, 1716753600000, 1711471500000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('0ea6d27c-b2e4-4fc2-b263-ba7d8569f71f', NULL, @joana_id, @espaco5, 'Aprovada', 'Estudo', 1719489600000, 1719500400000, 1711540200000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('1f67873a-6b1b-4f3b-9178-2d650d00f7d5', NULL, @joao_id, @espaco1, 'Aprovada', 'Estudo', 1711632600000, 1711641600000, 1711632000000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('3c5b8248-e685-4a1c-a511-366faefcb3ad', @maria_id, @pedro_id, @espaco2, 'Aprovada', 'Evento', 1719666000000, 1719673200000, 1711716600000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('6a7b61ff-d4a1-4662-b2c4-7d29050b30db', @maria_id, @vera_id, @espaco3, 'Aprovada', 'Estudo', 1717092000000, 1717099200000, 1711821000000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('9d518d1e-2f92-4f4e-8750-3e89f38411b2', @maria_id, @vera_id, @espaco4, 'Aprovada', 'Palestra', 1711904400000, 1711911600000, 1711903500000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('23c7f5e3-0c3a-4b85-a0c1-fb754ae6194c', @maria_id, @lucia_id, @espaco5, 'Aprovada', 'Estudo', 1711972800000, 1711983600000, 1711972200000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('40a25ae1-59c9-4a43-8de8-6d52892b1726', NULL, @joana_id, @espaco1, 'Aprovada', 'Evento', 1719936000000, 1719943200000, 1712072700000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('63e87b24-c536-4d5d-b1e2-868bb6b160cf', NULL, @dimitri_id, @espaco2, 'Aprovada', 'Estudo', 1720011600000, 1720018800000, 1712148600000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('81b924c5-881d-49f3-a3ed-4d51892ae086', NULL, @dimitri_id, @espaco3, 'Aprovada', 'Estudo', 1720112400000, 1720119600000, 1712249400000, UNIX_TIMESTAMP(NOW()) * 1000),
    
    ('58f5f999-aecc-464e-a997-78df9df6c8a3', NULL, @dimitri_id, @espaco2, 'Aprovada', 'Estudo', 1727776800000, 1727787600000, 1712249400000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('6f41ad0a-cceb-4fcf-b6db-c272d4aef1fc', NULL, @joana_id, @espaco7, 'Aprovada', 'Estudo', 1727780400000, 1727791200000, UNIX_TIMESTAMP(NOW()) * 1000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('be82177b-90ce-48eb-b87c-8f3ede5d839e', NULL, @joao_id, @espaco8, 'Aprovada', 'Estudo', 1727780400000, 1727782200000, 1712249400000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('a6d0870e-552e-4f68-b4b9-eec9bf742516', NULL, @vera_id, @espaco9, 'Aprovada', 'Estudo', 1727784000000, 1728565200000, 1712249400000, UNIX_TIMESTAMP(NOW()) * 1000),
    ('46da7e99-8815-4385-8f3a-6152d8cd17f3', NULL, @joana_id, @espaco10, 'Aprovada', 'Estudo', 1727769600000, 1728550800000, 1712249400000, UNIX_TIMESTAMP(NOW()) * 1000);

   
   
   
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




select distinct  f.*, t.facilityTypeDescription, b.buildingName
from tbreservations r
INNER JOIN tbFacilities f ON r.facilityId = f.facilityId
INNER JOIN tbBuildings b ON f.buildingId = b.buildingId
INNER JOIN tbFacilityTypes t ON t.facilityTypeId = f.facilityTypeId
where !(r.checkinDate >= 1704078000000 and r.checkoutDate <= 1709262000000 and 
f.buildingId = @azul_uuid) and 
f.capacity  >= 0;



SELECT DISTINCT  
    f.*, 
    t.facilityTypeDescription, 
    b.buildingName
FROM 
    tbreservations r
    INNER JOIN tbFacilities f ON r.facilityId = f.facilityId
    INNER JOIN tbBuildings b ON f.buildingId = b.buildingId
    INNER JOIN tbFacilityTypes t ON t.facilityTypeId = f.facilityTypeId
WHERE 
    !(
      f.capacity >= 10 AND
      (
      	r.checkinDate < 1727773200000 Or
      	r.checkinDate >=1727784000000
  	  ) and
      (
      	r.checkoutDate <= 1727773200000 or
      	r.checkoutDate >= 1727784000000
  	  ) AND
      f.facilityTypeId = 'ceb542b3-26de-4c9c-bfd3-a57f06f6fc14' AND
      f.buildingId = '376d163d-e00b-40e6-8857-f402e2feb6a8'
    ) AND
    f.capacity >= 10 AND
    f.facilityTypeId = 'ceb542b3-26de-4c9c-bfd3-a57f06f6fc14'  AND
    f.buildingId = '376d163d-e00b-40e6-8857-f402e2feb6a8';

   
-- ler todas as salas correspondente ao filtro
 SELECT  
    f.*,
    t.facilityTypeDescription, 
    b.buildingName
FROM 
    tbFacilities f
    INNER JOIN tbBuildings b ON f.buildingId = b.buildingId
    INNER JOIN tbFacilityTypes t ON t.facilityTypeId = f.facilityTypeId
WHERE 
    f.capacity >= 10 AND
    f.facilityTypeId = 'ceb542b3-26de-4c9c-bfd3-a57f06f6fc14'  AND
    f.buildingId = '376d163d-e00b-40e6-8857-f402e2feb6a8';