drop database if exists puc_espacos;

CREATE DATABASE puc_espacos;

USE puc_espacos;

CREATE TABLE tb_campi (
    campus_id Varchar(40) PRIMARY KEY,
    nome_campus Varchar(50) UNIQUE,
    data_hora_criacao Datetime,
    data_hora_alteracao Datetime
);

CREATE TABLE tb_escolas (
    escola_id Varchar(40) PRIMARY KEY,
    nome_escola Varchar(50),
    data_hora_criacao Datetime,
    data_hora_alteracao Datetime
);

CREATE TABLE tb_blocos (
    bloco_id Varchar(40) PRIMARY KEY,
    campus_id Varchar(40),
    escola_id Varchar(40),
    nome_bloco Varchar(50),
    data_hora_criacao Datetime,
    data_hora_alteracao Datetime,
    foreign key (campus_id) references tb_campi(campus_id),
    foreign key (escola_id) references tb_escolas(escola_id)
);

CREATE TABLE tb_tipos_espaco (
    tipo_espaco_id Varchar(40) PRIMARY KEY,
    descricao_tipo_espaco Varchar(70) UNIQUE
);

CREATE TABLE tb_espacos (
    espaco_id Varchar(40) PRIMARY KEY, 
    bloco_id Varchar(40),
    tipo_espaco_id Varchar(40),
    esta_ativo Bool,
    nome_espaco Varchar(50),
    numero Varchar(5),
    capacidade Int,
    observacao Varchar(300),
    data_hora_alteracao Datetime,
    data_hora_criacao Datetime,
    foreign key (bloco_id) references tb_blocos(bloco_id),
    foreign key (tipo_espaco_id) references tb_tipos_espaco(tipo_espaco_id)
);

CREATE TABLE tb_ativos (
    ativo_id Varchar(40) PRIMARY KEY,
    descricao_ativo Varchar(50) UNIQUE
);

CREATE TABLE tb_ativos_espaco (
    espaco_id Varchar(40),
    ativo_id Varchar(40),
    quantidade Int,
    data_hora_criacao Datetime,
    data_hora_alteracao Datetime,
    PRIMARY KEY (espaco_id, ativo_id),
    foreign key (espaco_id) references tb_espacos(espaco_id),
    foreign key (ativo_id) references tb_ativos(ativo_id)
);

CREATE TABLE tb_usuarios (
    usuario_id Varchar(40) PRIMARY KEY,
    escola_id Varchar(40),
    email Varchar(50) UNIQUE,
    senha Varchar(50),
    nome_usuario Varchar(100),
    tipo_usuario Enum('SECRETARIO','DOCENTE','DISCENTE','ADMINISTRADOR'),
    esta_ativo Bool,
    data_hora_criacao Datetime,
    data_hora_alteracao Datetime,
    foreign key (escola_id) references tb_escolas(escola_id)
);

CREATE TABLE tb_reservas (
    reserva_id Varchar(40) PRIMARY KEY,
    usuario_solicitante_id  Varchar(40),
    usuario_responsavel_id Varchar(40),
    espaco_id Varchar(40),
    status_reserva Enum('SOLICITADO','ATIVA','CANCELADO','EM ANDAMENTO','FINALIZADO'),
    finalidade Enum('AULA','PALESTRA','LAZER','EVENTO','ESTUDO','OUTRO'),
    data_hora_inicio_reserva Datetime,
    data_hora_fim_reserva Datetime,
    data_hora_criacao Datetime,
    data_hora_alteracao Datetime,
    foreign key (usuario_solicitante_id) references tb_usuarios(usuario_id),
    foreign key (usuario_responsavel_id) references tb_usuarios(usuario_id),
    foreign key (espaco_id) references tb_espacos(espaco_id)
);

# ------------------------------Definição UUID---------------------------------------------------
-- Definição das constantes para campus_id
SET @curitiba_uuid = UUID();
SET @londrina_uuid = UUID();

-- Definição das constantes para escola_id
SET @belas_artes_id = UUID();
SET @direito_id = UUID();
SET @educacao_humanidades_id = UUID();
SET @medicina_ciencias_vida_id = UUID();
SET @negocios_id = UUID();
SET @politecnica_id = UUID();

-- Definição das constantes para bloco_id
SET @amarelo_uuid = UUID();
SET @azul_uuid = UUID();
SET @verde_uuid = UUID();
SET @laranja_uuid = UUID();
SET @vermelho1_uuid = UUID();
SET @vermelho2_uuid = UUID();
SET @usina_piloto_uuid = UUID();
SET @eletrica_uuid = UUID();
SET @mecanica_uuid = UUID();
SET @complexo_esportivo_uuid = UUID();
SET @ginasio_uuid = UUID();

-- Definição das constantes para tipo_espaco_id
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

-- Definição das constantes para usuario_id
SET @joao_id = UUID();
SET @maria_id = UUID();
SET @pedro_id = UUID();
SET @ana_id = UUID();
SET @andre_id = UUID();

# ------------------------------Inserções---------------------------------------------------

-- Inserção Campus
INSERT INTO tb_campi (campus_id, nome_campus, data_hora_criacao, data_hora_alteracao)
VALUES 
	(@curitiba_uuid, 'Curitiba', NOW(), NOW()),
	(@londrina_uuid, 'Londrina', NOW(), NOW());
    
-- Inserção Escolas
INSERT INTO tb_escolas (escola_id, nome_escola, data_hora_criacao, data_hora_alteracao) 
VALUES
	(@belas_artes_id, 'BELAS ARTES', NOW(), NOW()),
	(@direito_id, 'DIREITO', NOW(), NOW()),
	(@educacao_humanidades_id, 'EDUCAÇÃO E HUMANIDADES', NOW(), NOW()),
	(@medicina_ciencias_vida_id, 'MEDICINA E CIÊNCIAS DA VIDA - EMCV', NOW(), NOW()),
	(@negocios_id, 'NEGÓCIOS', NOW(), NOW()),
	(@politecnica_id, 'POLITÉCNICA', NOW(), NOW());

-- Inserção Blocos Com Escola
INSERT INTO tb_blocos (bloco_id, campus_id, escola_id, nome_bloco, data_hora_criacao, data_hora_alteracao)
VALUES 
	(@amarelo_uuid, @curitiba_uuid, @educacao_humanidades_id, '1 - Amarelo', NOW(), NOW()),
	(@verde_uuid, @curitiba_uuid, @medicina_ciencias_vida_id, '3 - Verde', NOW(), NOW()),
	(@laranja_uuid, @curitiba_uuid, @negocios_id, '4 - Laranja', NOW(), NOW()),
	(@vermelho1_uuid, @curitiba_uuid, @direito_id, '5 - Vermelho', NOW(), NOW()),
	(@vermelho2_uuid, @curitiba_uuid, @medicina_ciencias_vida_id, '6 - Vermelho', NOW(), NOW()),
	(@usina_piloto_uuid, @curitiba_uuid, @politecnica_id, '7 - Usina Piloto', NOW(), NOW()),
	(@eletrica_uuid, @curitiba_uuid, @politecnica_id, '8 - Elétrica', NOW(), NOW()),
	(@mecanica_uuid, @curitiba_uuid, @politecnica_id, '9 - Mecânica', NOW(), NOW());

-- Inserção Blocos Sem Escola
INSERT INTO tb_blocos (bloco_id, campus_id, nome_bloco, data_hora_criacao, data_hora_alteracao)
VALUES 
	(@azul_uuid, @curitiba_uuid, '2 - Azul', NOW(), NOW()),
	(@complexo_esportivo_uuid, @curitiba_uuid, 'Complexo Esportivo', NOW(), NOW()),
	(@ginasio_uuid, @curitiba_uuid, 'Ginásio', NOW(), NOW());

-- Inserção Tipos de Espaços
INSERT INTO tb_tipos_espaco (tipo_espaco_id, descricao_tipo_espaco) 
VALUES 
    (@quadra_uuid, 'Quadra Esportiva'),
    (@auditorio_uuid, 'Auditório'),
    (@sala_estudo_uuid, 'Sala de Estudo'),
    (@lab_informatica_uuid, 'Laboratório de Informática'),
    (@sala_aula_uuid, 'Sala de Aula');
    
-- Inserção Espaços
INSERT INTO tb_espacos (espaco_id, bloco_id, tipo_espaco_id, esta_ativo, nome_espaco, numero, capacidade, observacao, data_hora_alteracao, data_hora_criacao)
VALUES 
	(@espaco1, @azul_uuid,  @sala_aula_uuid, 1, 'Sala Grace Hopper', '001', 50, 'Nenhuma observação', NOW(), NOW());

-- Inserção Ativos
INSERT INTO tb_ativos (ativo_id, descricao_ativo)
VALUES 
    (@ventilador_id, 'Ventilador'),
    (@cadeira_id, 'Cadeira'),
    (@projetor_id, 'Projetor'),
    (@quadro_branco_id, 'Quadro Branco'),
    (@quadro_negro_id, 'Quadro Negro'),
    (@computador_id, 'Computador'),
    (@mesa_id, 'Mesas');

-- Inserção Usuáios Sem Escola
INSERT INTO tb_usuarios (usuario_id, email, senha, nome_usuario, tipo_usuario, esta_ativo, data_hora_criacao, data_hora_alteracao)
VALUES 
	(@maria_id, 'maria@pucpr.edu.br', 'senha456', 'Maria', 'DOCENTE', 1, NOW(), NOW()),
	(@pedro_id, 'pedro@pucpr.edu.br', 'senha789', 'Pedro', 'DISCENTE', 1, NOW(), NOW()),
	(@ana_id, 'ana@pucpr.edu.br', 'senhaabc', 'Ana', 'ADMINISTRADOR', 1, NOW(), NOW()),
    (@andre_id, 'andre@pucpr.edu.br', 'senhadef', 'Andre', 'ADMINISTRADOR', 1, NOW(), NOW());

-- Inserção Usuáios Com Escola
INSERT INTO tb_usuarios (usuario_id, escola_id, email, senha, nome_usuario, tipo_usuario, esta_ativo, data_hora_criacao, data_hora_alteracao)
VALUES 
	(@joao_id, @direito_id, 'joao@pucpr.edu.br', 'senha123', 'João', 'SECRETARIO', 1, NOW(), NOW());
    
-- Inserção Reserva
INSERT INTO tb_reservas (reserva_id, usuario_solicitante_id, usuario_responsavel_id, espaco_id, status_reserva, finalidade, data_hora_inicio_reserva, data_hora_fim_reserva, data_hora_criacao, data_hora_alteracao)
VALUES 
	(UUID(), 'usuario_solicitante_id_aqui', 'usuario_responsavel_id_aqui', 'espaco_id_aqui', 'SOLICITADO', 'AULA', NOW(), NOW() + INTERVAL 1 HOUR, NOW(), NOW());













