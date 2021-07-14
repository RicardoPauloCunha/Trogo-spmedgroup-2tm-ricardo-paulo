USE SpMedicalGroup;
GO

--- SELECT *

SELECT * FROM Usuarios;

SELECT * FROM Consultas;

SELECT * FROM Medicos;

--- SELECT INNER JOIN

SELECT * FROM Prontuarios AS P
INNER JOIN Consultas AS C
ON P.Id = C.ProntuarioId;

SELECT * FROM Prontuarios AS P
INNER JOIN Usuarios AS U
ON P.UsuarioId = U.Id;

SELECT * FROM Usuarios AS U
INNER JOIN TiposUsuarios AS T
ON U.TipoUsuarioId = T.Id;

SELECT * FROM Medicos AS M
INNER JOIN Especialidades AS E
ON M.EspecialidadeId = E.Id;

SELECT * FROM Medicos AS M
INNER JOIN Clinicas AS C
ON M.ClinicaId = C.Id;

SELECT * FROM Medicos AS M
INNER JOIN Usuarios AS U
ON M.UsuarioId = U.Id;

SELECT * FROM Medicos AS M
INNER JOIN Especialidades AS E
ON M.EspecialidadeId = E.Id
INNER JOIN Clinicas AS C
ON M.ClinicaId = C.Id
INNER JOIN Usuarios AS U
ON M.UsuarioId = U.Id;

--- QUANTIDADE DE CADASTROS EM UMA TABELA

SELECT COUNT(ID) AS QUANT_PRONTS FROM Prontuarios;

SELECT COUNT(ID) AS QUANT_MEDICOS FROM Medicos;

SELECT COUNT(ID) AS QUANT_CONSULTAS FROM Consultas;

--- CONVERTER DATA PARA 00/00/0000

SELECT CONVERT(VARCHAR, DataAgendada, 101) AS DataConvertida, Consultas. *  FROM Consultas;

--- CALCULA A IDADE

SELECT DATEDIFF(MONTH, DataNascimento, GETDATE())/12 AS Idade, Prontuarios. * FROM Prontuarios;

-- FUNCTION

SELECT * from dbo.QUANT_MED_ESP(12);

SELECT * FROM MED_ESP(17); 

-- PROCEDURE

EXECUTE Idade_DataNascimento'09-12-2002';
