import io

ALLOWED_EXTENSIONS = {'jpg', 'jpeg'} ##Para ser capaces de traducir despues la imagen

def allowed_file(filename):
    """Funcion que nos permite saber si el archivo que se sube es una imagen"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def precioFloat(precioP, precioC):
    """Funcion que toma dos enteros, uno representado el entero y el otro la parte flotante
        y los convierte en un flotante"""
    return float(precioP) + float(precioC) / 100

def obtenerBinario(imagen):
    """ Funcion que dado un FileStorage de una imagen, la convierte en un binario"""
    memoria=io.BytesIO()
    imagen.save(memoria)
    memoria.seek(0)
    return memoria.read()

