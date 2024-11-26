CREATE TABLE Escolaridad (
    ID SERIAL PRIMARY KEY,
    Nivel TEXT UNIQUE NOT NULL
);
CREATE TABLE Habilidades (
    ID SERIAL PRIMARY KEY,
    Habilidad TEXT UNIQUE NOT NULL
);

CREATE TABLE Usuarios (
    ID SERIAL PRIMARY KEY,
    CURP VARCHAR(18) UNIQUE NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    --Apellidos VARCHAR(150) NOT NULL,
    Direccion TEXT NOT NULL,
    FechaNacimiento Date NOT NULL,
    CorreoElectronico VARCHAR(150) UNIQUE NOT NULL,
    --Contrasena TEXT NOT NULL,
    NivelEscolaridad INT REFERENCES Escolaridad(ID),
    FotografiaS3 TEXT
);

CREATE TABLE Usuario_Habilidades (
    ID_USUARIO_HABILIDAD SERIAL PRIMARY KEY,
    ID_Usuario INT REFERENCES Usuarios(ID) ON DELETE CASCADE,
    ID_Habilidad INT REFERENCES Habilidades(ID) ON DELETE CASCADE
);
