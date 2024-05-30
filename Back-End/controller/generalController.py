from flask import Blueprint, session, render_template, url_for, request, flash
from sqlalchemy.exc import IntegrityError
from alchemyClasses import db
from alchemyClasses.Comprador import Comprador
from alchemyClasses.Vendedor import Vendedor
from model.modelGeneral import * 
from model.modelComprador import  verificacionInformacion as compradorVerificacion
from model.modelVendedor import  verificacionInformacion as vendedorVerificacion






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
            
            registro = Comprador( nombre, apellidoPaterno, nombreUsuario, contrasena,telefono,correo,apellidoMaterno)
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


@generalController.route('/verificarAcceso', methods=['POST'])
def verificarAcceso():
    correo = request.json['correo']
    contrasena = request.json['contrasena']
    rol = request.json['opcion']
    if rol == 'comprador':
        resultado = compradorVerificacion(correo, contrasena)
    elif rol == 'vendedor':
        resultado = vendedorVerificacion(correo, contrasena)

    persona = resultado[0] #persona puede ser comprador o vendedor
    error = resultado[1]
    print(persona)
    if persona == None:
        return {
            "error": "Usuario no encontrado"
        }
    if error :
        return {
            "errorC": "Contrasena incorrecta"
        }
    return {
        "id" : persona.idComprador if rol == 'comprador' else persona.idVendedor,
        "usuario": persona.usuario,
        "rol": rol
        }             

    
