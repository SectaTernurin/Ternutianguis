from flask import Blueprint, session, render_template, url_for, request, flash
from sqlalchemy.exc import IntegrityError
from alchemyClasses import db
import json
from model.modelComentario import guardarComentario as guardarComentarioModel
from model.modelComentario import obtenerComentarios as obtenerComentariosModel 








comentarioController = Blueprint('comentarioController', __name__, template_folder='templates', url_prefix='/comentarios')

 
@comentarioController.route('/registrar', methods=['POST'])
def guardarComentario():
    data = request.get_json()
    idProducto = data['idProducto']
    idUsuario = data['idUsuario']
    comentario = data['comentario']
    calificacion = data['calificacion']
    guardarComentarioModel(idProducto, idUsuario, comentario, calificacion)
    
    return {
        "mensaje": "Registro realizado exitosamente."
    }

@comentarioController.route('/obtenerComentarios', methods=['GET', 'POST'])
def obtenerComentarios():
    idProducto = request.json['id']
    diccionario = {}
    resultado = obtenerComentariosModel(idProducto)
    diccionario["Comentarios"] = resultado
    resultadoJson = json.dumps(diccionario)
    return resultadoJson