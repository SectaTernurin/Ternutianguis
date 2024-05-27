import React, { Component } from 'react';

export class VendedorProductos extends Component {
    state = {
        productos: [] // Asumiendo que los productos del vendedor se cargan aquí
    };

    // Método para eliminar un producto
    eliminarProducto = async (idProducto) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            return; // Detener si el usuario no confirma
        }
        

        try {
            const response = await fetch(`/eliminarProducto/${idProducto}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.success) {
                alert('Producto eliminado correctamente');
                // Actualizar el estado para reflejar el producto eliminado
                this.setState({
                    productos: this.state.productos.filter(producto => producto.idProducto !== idProducto)
                });
            } else {
                alert(data.message); // Mostrar mensaje de error del servidor
            }
        } catch (error) {
            alert('Error al comunicarse con el servidor');
        }
    }

    render() {
        return (
            <div>
                {this.state.productos.map((producto) => (
                    <div key={producto.idProducto}>
                        <p>{producto.nombre}</p>
                        {/* Otros detalles del producto */}
                        <button onClick={() => this.eliminarProducto(producto.idProducto)}>
                            Eliminar Producto
                        </button>
                    </div>
                ))}
            </div>
        );
    }
}

//export default VendedorProductos;