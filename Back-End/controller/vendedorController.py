from flask import Blueprint, session, render_template, url_for, request, flash
from alchemyClasses import db
from model.modelProducto import buscarProductosVendedor as buscar
import simplejson as json





vendedorController = Blueprint('vendedorController', __name__, template_folder='templates', url_prefix='/vendendor')

@vendedorController.route('/productos', methods=['GET','POST'])
def obtenerProductos():
    id = request.json['id']
    print(id)
    diccionario = {}
    resultado = buscar(id)
    lista = []
    for producto in resultado:
        lista.append(resultado[producto])
    diccionario["Productos"] = lista
    resultadoJson = json.dumps(diccionario)
    return resultadoJson


