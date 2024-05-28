import io
import json
from alchemyClasses import db
from alchemyClasses.Producto import Producto
from alchemyClasses.Vendedor import Vendedor



ALLOWED_EXTENSIONS = {'jpg', 'jpeg'} ##Para ser capaces de traducir despues la imagen

def allowed_file(filename):
    """Funcion que nos permite saber si el archivo que se sube es una imagen"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def precioFloat(precioP, precioC):
    """Funcion que toma dos enteros, uno representado el entero y el otro la parte flotante
        y los convierte en un flotante"""
    return float(precioP) + float(precioC) / 100

def obtenerBinario(imagen):
    """ Funcion que dado un FileStorage de una imagen, la convierte en un binario"""
    memoria=io.BytesIO()
    imagen.save(memoria)
    memoria.seek(0)
    return memoria.read()

def buscarProductosVendedor(id):
    """ Funcion que busca los productos de un vendedor
    Parámetros:
    id: int -> id del vendedor
    Retorna:
    lista de productos serializados
    """
    productos = Producto.query.filter(Producto.idVendedor == id).all()
    if productos == []:
        return [ ]
    return preparar_producto(productos)

def preparar_producto(productos):
    """ Funcion que prepara un diccionario para que se pueda serializar a JSON
    Parámetros:
    productos: list -> lista de productos a serializar
    Retorna:
    diccionario con los productos serializados
    """
    diccionario = {}
    for producto in productos:
        diccionario[producto.idProducto] = producto.to_dic()
    return diccionario

def eliminarProducto(idProducto):
    """ Funcion que elimina un producto de la base de datos
    Parámetros:
    idProducto: int -> id del producto a eliminar
    Retorna:
    diccionario con mensaje de exito
    """
    producto = Producto.query.filter(Producto.idProducto == idProducto).first()
    db.session.delete(producto)
    db.session.commit()
    return {'mensaje': 'Producto dado de baja exitosamente'}

def obtenerProductoPorId(idProducto):
    """ Funcion que obtiene un producto por su id
    Parámetros:
    idProducto: int -> id del producto a obtener
    Retorna:
    diccionario con el producto serializado
    """
    producto = Producto.query.filter(Producto.idProducto == idProducto).first()
    print(producto)
    if producto  == []:
        return [ ]
    return producto.to_dic()