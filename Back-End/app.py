from flask import Flask, redirect, render_template, url_for, request, flash, session
from alchemyClasses import db
from alchemyClasses.Comprador import Comprador
from controller.generalController import generalController
from model.model_comprador import get_log_In
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://adminTernu:TernuTianguis.Admin2024@localhost:3306/TernuTianguis'
app.register_blueprint(generalController)
app.config['SECRET_KEY'] = 'dev'

db.init_app(app)

@app.route('/loginVerificar', methods=['POST'])
def loginVerificar():
    correo = request.json['correo']
    contrasena = request.json['contrasena']
    resultado = get_log_In(correo, contrasena)
    comprador = resultado[0]
    error = resultado[1]
    print(comprador)
    if comprador == None:
        return {
            "error": "Usuario no encontrado"
        }
    if error :
        return {
            "errorC": "Contrasena incorrecta"
        }
    return {
        "usuario": comprador.usuario
    }




@app.route('/')
def hello_world():
    return "hello world"



if __name__ == '__main__':
    app.run()
