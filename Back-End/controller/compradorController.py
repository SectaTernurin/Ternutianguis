from flask import Blueprint, session, render_template, url_for, request, flash
from sqlalchemy.exc import IntegrityError
from alchemyClasses import db
from alchemyClasses.Comprador import Comprador
from model.modelProducto import *
from model.modelCompra import *
import simplejson as json


compradorController = Blueprint('compradorController', __name__, template_folder='templates', url_prefix='/comprador')

 
@compradorController.route('/obtenerProductos', methods=['POST'])
def obtenerProductos():
    """ Funcion que obtiene todos los productos de la base de datos
    Retorna:
    lista de productos serializados
    """
    data = request.get_json()
    diccionario = {}
    resultado = obtenerTodosProductos()
    lista = []
    for producto in resultado:
        lista.append(resultado[producto])
    diccionario["Productos"] = lista
    resultadoJson = json.dumps(diccionario)
    return resultadoJson

@compradorController.route('/buscarProductos', methods=['POST'])
def buscarProductos():
    productos = request.json['elem']
    diccionario = {}
    resultado = buscarProducto(productos)
    lista = []
    for producto in resultado:
        lista.append(resultado[producto])
    diccionario["Productos"] = lista
    resultadoJson = json.dumps(diccionario)
    return resultadoJson

@compradorController.route('/buscarCategoria', methods=['GET', 'POST'])
def buscarProductosCategorias():
    productos = request.json['elem']
    diccionario = {}
    resultado = buscarCategoria(productos)
    lista = []
    for producto in resultado:
        lista.append(resultado[producto])
    diccionario["Productos"] = lista
    resultadoJson = json.dumps(diccionario)
    return resultadoJson

@compradorController.route('/buscarProductoCategoria', methods=['GET', 'POST'])
def buscarProductosPorCategoria():
    productos = request.json['elem']
    categoria = request.json['categoria']
    diccionario = {}
    resultado = buscarProductosCategoria(productos, categoria)
    lista = []
    for producto in resultado:
        lista.append(resultado[producto])
    diccionario["Productos"] = lista
    resultadoJson = json.dumps(diccionario)
    return resultadoJson

@compradorController.route('/comprarProducto', methods=['POST'])
def comprarProducto():
    idComprador = request.json['idComprador']
    idProducto = request.json['idProducto']
    apartarProducto(idComprador, idProducto)
    return {"mensaje": "Compra exitosa"}