from alchemyClasses import db 
from alchemyClasses.Comprador import Comprador



def get_compradores():
    return Comprador.query.all()

def get_log_In(correo, contrasena):
    tError = False
    compradorValido = Comprador.query.filter_by(correo = correo).first()
    if compradorValido != None:
        if compradorValido.contrasena != contrasena:
            tError = True
    
    return compradorValido, tError