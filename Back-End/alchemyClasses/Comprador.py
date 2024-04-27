from sqlalchemy import Column, Integer, String, ForeignKey
from alchemyClasses import db


class Comprador(db.Model):
    __tablename__ = 'Compradores'
    idComprador = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200))
    apPat = Column(String(200))
    apMat = Column(String(200), nullable=True)
    usuario = Column(String(50))
    contrasena = Column(String(64))
    telefono = Column(String(45))
    correo = Column(String(45), unique=True)
    fotoDePerfil = Column(db.LargeBinary, nullable=True)


    def __init__(self, nombre, apPat, usuario, contrasena, telefono, correo,apMat=None, fotoDePerfil=None):
        self.nombre = nombre
        self.apPat = apPat
        self.apMat = apMat
        self.usuario = usuario
        self.contrasena = contrasena
        self.telefono = telefono
        self.correo = correo
        self.fotoDePerfil = fotoDePerfil

    def __str__(self):
        return f'{self.nombre} {self.apPat} {self.apMat}'
   