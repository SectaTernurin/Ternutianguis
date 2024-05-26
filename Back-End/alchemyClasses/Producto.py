from sqlalchemy import Column, Integer, String, ForeignKey
from alchemyClasses import db
from alchemyClasses.Vendedor import Vendedor
import base64 # Nos ayuda a pasar de bytes a string

class Producto(db.Model):
    __tablename__ = 'Productos'

    idProducto = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(200))
    descripcion = Column(String(200))
    precio = Column(db.DECIMAL(10,2))
    foto = Column(db.LargeBinary)
    cantidad = Column(Integer, default=0)
    categoria = Column(String(200))
    idVendedor = Column(Integer, db.ForeignKey(Vendedor.idVendedor))
    
    def __init__(self, nombre, descripcion, precio, foto, cantidad, categoria, idVendedor):
        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.foto = foto
        self.cantidad = cantidad
        self.categoria = categoria
        self.idVendedor = idVendedor

    def to_dic(self):
        """ Metodo que convierte un objeto Producto en un diccionario """
        return {
            "id" : self.idProducto,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "foto": base64.b64encode(self.foto).decode("utf-8"),
            "cantidad": self.cantidad,
            "categoria": self.categoria,
            "idVendedor": self.idVendedor
        }
        
            
            




