from flask import Blueprint, session, render_template, url_for, request, flash
import io
from sqlalchemy.exc import IntegrityError
from alchemyClasses import db
from alchemyClasses.Producto import Producto
from model.modelProducto import *






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

    precio=precioFloat(precioP, precioC)
    print(precio)

    if allowed_file(imagen.filename):
        memoria=io.BytesIO()
        imagen.save(memoria)
        memoria.seek(0)
        blob=memoria.read()
        producto = Producto(nombre, descripcion, precio, blob,cantidad, categoria, idVendedor)
        db.session.add(producto)
        db.session.commit()

    else:
        flash('Formato de imagen no permitido', 'danger')
        return redirect(url_for('alta_producto'))

    

    return "hola"