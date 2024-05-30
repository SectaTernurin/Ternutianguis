from alchemyClasses import db 
from alchemyClasses.Comentario import Comentario

def guardarComentario(idProducto, idComprador, comentario, calificacion):
    comentario = Comentario(comentario, idProducto, idComprador, calificacion)
    db.session.add(comentario)
    db.session.commit()
