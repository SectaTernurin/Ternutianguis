from sqlalchemy import Column, Integer, String, ForeignKey
from alchemyClasses import db
from alchemyClasses.Comprador import Comprador
from alchemyClasses.Producto import Producto

class Comentario(db.Model):
    __tablename__ = 'Comentarios'
    idComentario = Column(Integer, primary_key=True, autoincrement=True)
    comentario = Column(String(200))
    calificacion = Column(Integer)
    idProducto = Column(Integer, ForeignKey('Productos.idProducto'))
    idComprador = Column(Integer, ForeignKey('Compradores.idComprador'))

    def __init__(self, comentario, idProducto, idComprador, calificacion):
        self.comentario = comentario
        self.calificacion = calificacion
        self.idProducto = idProducto
        self.idComprador = idComprador
