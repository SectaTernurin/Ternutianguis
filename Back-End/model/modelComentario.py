from alchemyClasses import db 
from alchemyClasses.Comentario import Comentario
from alchemyClasses.Comprador import Comprador
from alchemyClasses.Producto import Producto

def guardarComentario(idProducto, idComprador, comentario, calificacion):
    comentario = Comentario(comentario, idProducto, idComprador, calificacion)
    db.session.add(comentario)
    db.session.commit()

def obtenerComentarios(id):
    comentarios = Comentario.query.filter(Comentario.idProducto == id).all() 
    comentarios = [prepararComentrario(comentario) for comentario in comentarios]
    return comentarios



def prepararComentrario(comentarioO):
    autor = db.session.query(Comprador).filter(Comprador.idComprador == comentarioO.idComprador).first()
    usuario = autor.usuario
    producto = db.session.query(Producto).filter(Producto.idProducto == comentarioO.idProducto).first()
    nombreProducto = producto.nombre
    return {
        "comentario": comentarioO.comentario,
        "usuario": usuario,
        "producto": nombreProducto,
        "calificacion": comentarioO.calificacion
    }

def eliminarComentariosProducto(id):
    comentarios = Comentario.query.filter(Comentario.idProducto == id).all()
    for comentario in comentarios:
        db.session.delete(comentario)
    db.session.commit()