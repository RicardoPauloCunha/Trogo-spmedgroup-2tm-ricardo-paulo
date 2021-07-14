USE SpMedicalGroup;
GO

INSERT INTO TiposUsuarios
VALUES ('Administrador'),
('Médico'),
('Paciente');

INSERT INTO Usuarios (Email, Senha, TipoUsuarioId)
VALUES ('admin@gmail.com', 'admin132', '1'),
('ligia@gmail.com', 'ligia132', '3'),
('alexandre@gmail.com', 'alexandre', '3'),
('fernando@gmail.com', 'fernando132', '3'),
('henrique@gmail.com', 'henrique132', '3'),
('joao@hotmail.com', 'joao132', '3'),
('bruno@gmail.com', 'bruno132', '3'),
('mariana@outlook.com', 'mariana132', '3'),
('ricardo.lemos@spmedicalgroup.com.br', 'spricardo132', '2'),
('roberto.possarle@spmedicalgroup.com.br', 'sproberto', '2'),
('helena.souza@spmedicalgroup.com.br', 'sphelena132', '2');

INSERT INTO Prontuarios (Nome, Rg, Cpf, DataNascimento, Telefone, UsuarioId, Rua, Bairro, Cidade, Estado, Cep)
VALUES ('Ligia', '43522543-5', '94839859000', '1982-10-13', '11 3456-7654', 2, 'Rua Estado de Israel, 240', '','São Paulo', 'SP', '04022-000'),
('Alexandre', '32654345-7', '73556944057', '2001-07-23', '11 98765-6543', 3, 'Av. Paulista, 1578', 'Bela Vista', 'São Paulo', 'SP', '01310-200'),
('Fernando', '54636525-3', '16839338002', '1978-10-10', '11 97208-4453', 4, 'Av. Ibirapuera, 2927', 'Indianópolis','São Paulo', 'SP', '04029-200'),
('Henrique', '54366362-5', '14332654765', '1985-10-13', '11 3456-6543', 5, 'R. Vitória 120', 'Vila Sao Jorge', 'Barueri', 'SP', '06402-030'),
('João', '32544444-1', '91305348010', '1975-08-27', '11 7656-6377', 6, 'R. Ver. Geraldo de Camargo, 66', 'Santa Luzia', 'Ribeirão Pires', 'SP', '09405-380'),
('Bruno', '54566266-7', '79799299004', '1972-03-21', '11 95436-8769', 7, 'Alameda dos Arapanés, 945', 'Indianópolis','São Paulo', 'SP', '04524-001'),
('Mariana', '54566266-8', '13771913039', '2018-03-05','11 95425-4252', 8, 'R. São Antonio, 232', 'Vila Universal', 'Barueri', 'SP', '06407-140');

INSERT INTO Clinicas (NomeFantasia, RazaoSocial, HorarioFuncionamento, Cnpj, Rua, Bairro, Cidade, Estado, Cep)
VALUES ('SP Medical Group', 'SP Medical Group', 'Seg - Sex, 07:00 - 22:00', '86.400.902/0001-30', 'Av. Barão Limeira, 532', '', 'São Paulo', 'SP', '92401-220');

INSERT INTO Especialidades
VALUES ('Acupuntura'),
('Anestesiologia'),
('Angiologia'),
('Cardiologia'),
('Cirurgia Cardiovascular'),
('Cirurgia da Mão'),
('Cirurgia do Aparelho Digestivo'),
('Cirurgia Geral'),
('Cirurgia Pediátrica'),
('Cirurgia Plástica'),
('Cirurgia Torácica'),
('Cirurgia Vascular'),
('Dermatologia'),
('Radioterapia'),
('Urologia'),
('Pediatria'),
('Psiquiatria');

INSERT INTO Medicos (Nome, Crm, EspecialidadeId, UsuarioId, ClinicaId)
VALUES ('Ricardo Lemos', '54356-SP', 2, 9, 1),
('Roberto Possarle', '53452-SP', 17, 10, 1),
('Helena Strada', '65463-SP', 16, 11, 1);

INSERT INTO Situacoes
VALUES ('Agendada'),
('Realizada'),
('Cancelada');

INSERT INTO Consultas (ProntuarioId, MedicoId, DataAgendada, HoraAgendada, SituacaoId, Descricao)
VALUES (3, 3, '2019-01-20', '15:00:00', 2, 'Consulta regular'),
(6, 2, '2019-01-20', '10:00:00', 3, 'Consulta regular'),
(7, 2, '2019-01-20', '11:00:00', 2, 'Consulta regular'),
(2, 2, '2019-01-20', '10:00:00', 2, 'Consulta regular'),
(1, 1, '2019-01-20', '11:45:00', 3, 'Consulta regular'),
(3, 3, '2019-01-20', '15:00:00', 1, 'Consulta regular'),
(5, 1, '2019-01-20', '11:45:00', 1, 'Consulta regular');
