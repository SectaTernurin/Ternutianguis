from flask import Blueprint, session, render_template, url_for, request, flash
import io
from sqlalchemy.exc import IntegrityError
from alchemyClasses import db
from alchemyClasses.Producto import Producto
from model.modelProducto import *
from model.modelComentario import *
import simplejson as json






productoController = Blueprint('productoController', __name__, template_folder='templates', url_prefix='/productos')



 
@productoController.route('/darDeAltaProducto', methods=['POST'])
def darDeAltaProducto():
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']
    categoria = request.form['categoria']
    imagen = request.files['imagen']
    precioP = request.form['precioP']
    precioC = request.form['precioC']
    cantidad = request.form['cantidad']
    idVendedor = request.form['id']
    precio=precioFloat(precioP, precioC) ## Pasamos los dos enteros a flotante
    if allowed_file(imagen.filename):
        blob=obtenerBinario(imagen) ## Pasamos la imagen a binario
        producto = Producto(nombre, descripcion, precio, blob ,cantidad, categoria, idVendedor)
        db.session.add(producto)
        db.session.commit()

    else:
        {'mensaje': 'Formato de archivo no permitido'}

    return {'mensaje': 'Producto dado de alta exitosamente'}


@productoController.route('/darDeBajaProducto', methods=['POST', 'GET'])
def darDeBajaProducto():
    data = request.get_json()
    eliminarComentariosProducto(data['id'])
    idProducto = data['id']
    eliminarProducto(idProducto)
    return {'mensaje': 'Producto dado de baja exitosamente'}

@productoController.route('/obtenerProducto', methods=['POST'])
def obtenerProducto():
    data = request.get_json()
    idProducto = data['id']
    producto = obtenerProductoPorId(idProducto)
    resultadoJson = json.dumps(producto)
    return producto

@productoController.route('/actualizarProductos', methods=['POST'])
def actualizarProductos():
    data = request.get_json()
    idProducto = data['id']
    nombre = data['nombre']
    descripcion = data['descripcion']
    precioP = data['precioP']
    precioC = data['precioC']
    categoria = data['categoria']
    cantidad = data['cantidad']
    precio=precioFloat(precioP, precioC)
    producto = Producto.query.filter(Producto.idProducto == idProducto).first()
    producto.nombre = nombre
    producto.descripcion = descripcion
    producto.precio = precio
    producto.cantidad = cantidad
    producto.categoria = categoria
    db.session.commit()
    return {'mensaje': 'Producto actualizado exitosamente'}


@productoController.route('/actualizarImagen', methods=['POST'])
def actualizarImagen():
    idProducto = request.form['id']
    imagen = request.files['imagen']
    if allowed_file(imagen.filename):
        blob = obtenerBinario(imagen) ## Pasamos la imagen a binario
        producto = Producto.query.filter(Producto.idProducto == idProducto).first()
        producto.foto = blob
        db.session.commit()
        return {'mensaje': 'Imagen actualizada exitosamente'}
    return {'mensaje': 'Formato de archivo no permitido'}
