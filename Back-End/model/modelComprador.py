from alchemyClasses import db 
from alchemyClasses.Comprador import Comprador



def verificacionInformacion(correo, contrasena):
    tError = False
    compradorValido = Comprador.query.filter_by(correo = correo).first()
    print(compradorValido)
    if compradorValido != None:
        if compradorValido.contrasena != contrasena:
            tError = True
    
    return compradorValido, tError