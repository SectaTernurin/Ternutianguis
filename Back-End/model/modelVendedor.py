from alchemyClasses import db 
from alchemyClasses.Vendedor import Vendedor


def verificacionInformacion(correo, contrasena):
    tError = False
    vendedorValido = Vendedor.query.filter_by(correo = correo).first()
    if vendedorValido != None:
        if vendedorValido.contrasena != contrasena:
            tError = True

    return vendedorValido, tError