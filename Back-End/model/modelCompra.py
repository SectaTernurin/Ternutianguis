from alchemyClasses.Producto import Producto
from alchemyClasses.Vendedor import Vendedor
from alchemyClasses.Comprador import Comprador
from alchemyClasses import db
from email.message import EmailMessage
import ssl
import smtplib

def apartarProducto(idComprador, idProducto):
    """ Funcion que aparta un producto de la base de datos
    Args:
    idComprador: id del comprador
    idProducto: id del producto
    Retorna:
    True si se aparto el producto, False en caso contrario
    """
    producto = Producto.query.filter_by(idProducto=idProducto).first()
    comprador = Comprador.query.filter_by(idComprador=idComprador).first()
    idVendedor = producto.idVendedor
    vendedor = Vendedor.query.filter_by(idVendedor=idVendedor).first()
    if producto.cantidad > 0:
        producto.cantidad = producto.cantidad - 1
        db.session.commit()
    enviarCorreoCliente(comprador, producto, vendedor)
    return True

def enviarCorreoCliente(comprador, producto, vendedor):
    """ Funcion que envia un correo al cliente con la informacion del producto
    y el vendedor"""

    pw = "usqtctyirbdoxrxq"
    emisor = "ternutianguis@gmail.com"
    remitente = comprador.correo
    asunto = "Apartado de producto exitoso"
    cuerpo = """Hola, te informamos que has apartado con exito tu producto.\r\r\n""" 
    cuerpo = cuerpo + "El producto que apartaste es: " + producto.nombre +"\r\r\n"
    cuerpo = cuerpo + "El vendedor es: " + vendedor.usuario + "\r\r\n"
    cuerpo = cuerpo + "El precio del producto es: " + str(producto.precio) + "\r\r\n"
    cuerpo = cuerpo + "Es necesario que te comuniques con el vendedor para poder finalizar la compra \r\r\n"
    cuerpo = cuerpo + "El correo del vendedor es: " + vendedor.correo + "\r\r\n"
    cuerpo = cuerpo + "El telefono del vendedor es: " + vendedor.telefono + "\r\r\n"
    cuerpo = cuerpo + "Gracias por usar TernuTianguis"

    em = EmailMessage()
    em["From"] = emisor
    em["To"] = remitente
    em["Subject"] = asunto
    em.set_content(cuerpo)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com",465,context=context) as smtp:
        smtp.login(emisor, pw)
        smtp.sendmail(emisor,remitente,em.as_string())

