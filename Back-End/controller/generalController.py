from flask import Blueprint, session, render_template, url_for, request, flash
from sqlalchemy.exc import IntegrityError
from alchemyClasses import db
from alchemyClasses.Comprador import Comprador
from alchemyClasses.Vendedor import Vendedor
from model.modelGeneral import * 





generalController = Blueprint('generalController', __name__, template_folder='templates', url_prefix='/general')

 
@generalController.route('/registrar', methods=['POST'])
def registrar():
    """ Funcion que se encarga de registrar a un usuario en la base de datos"""

    correo = request.json['correo'] 
    nombreUsuario = request.json['nombreUsuario']
    telefono = request.json['telefono'] 
    opcion = request.json['opcion']
    nombre = request.json['nombre']
    apellidoPaterno = request.json['apellidoPaterno']
    apellidoMaterno = request.json['apellidoMaterno']
    contrasena = crearContrasena()

    try:
        if opcion == 'comprador':
            registro = Comprador( nombre, apellidoPaterno, apellidoMaterno, nombreUsuario, contrasena, telefono, correo)
        elif opcion == 'vendedor':
            registro = Vendedor( nombre, apellidoPaterno, apellidoMaterno, nombreUsuario, contrasena, telefono, correo)

        db.session.add(registro)
        db.session.commit()
        enviarCorreo(correo, contrasena)

        return {
        "registro": "Registro realizado exitosamente."
        } 
    except IntegrityError:
        db.session.rollback()
        return {
            "error": "Correo ya registrado."
        } 