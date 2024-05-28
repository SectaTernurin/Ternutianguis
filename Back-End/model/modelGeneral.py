import random

from email.message import EmailMessage
import ssl
import smtplib

def crearContrasena():
    """ Funcion que crea una contraseña aleatoria """
    caracteres = list(range(10)) + [chr(i) for i in range(97, 123)]
    ch = random.randint(0, 35)
    longitud = random.randint(8,14)
    contrasena = ''

    for i in range(longitud):
        nuevoCh = caracteres[random.randint(0, 35)]
        contrasena = contrasena + str(nuevoCh)
    return contrasena

def enviarCorreo(correo, contrasena):
    """ Funcion que se encarga de enviar un correo al usuario con su contraseña 
    parametro correo: correo del usuario
    parametro contrasena: contraseña del usuario
    """
    pw = "usqtctyirbdoxrxq"
    emisor = "ternutianguis@gmail.com"
    remitente = correo
    asunto = "Registro exitoso"
    usuarioPw = contrasena
    cuerpo = """
Hola, te informamos que tu cuenta ha sido creada con exito.

Tu contraseña para ingresar al sistema es la siguiente: 
    """ 
    cuerpo = cuerpo + usuarioPw

    em = EmailMessage()
    em["From"] = emisor
    em["To"] = remitente
    em["Subject"] = asunto
    em.set_content(cuerpo)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com",465,context=context) as smtp:
        smtp.login(emisor, pw)
        smtp.sendmail(emisor,remitente,em.as_string())