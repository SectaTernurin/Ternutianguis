from flask import Blueprint, render_template, url_for, redirect, request
from model import model_compradores

comprador_controller = Blueprint('comprador_controller', __name__, template_folder='templates')

@comprador_controller.route('/', methods=['GET', 'POST'])

@comprador_controller.route('/compradores', methods=['GET', 'POST'])
def compradores():
    compradores = model_compradores.get_compradores()
    return render_template('compradores.html', compradores=compradores)


