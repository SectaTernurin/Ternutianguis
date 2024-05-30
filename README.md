# Secta Ternurin Proyecto Final

## Integrantes:

- Regina Del Razo Castillo
- Dulce Julieta Mora Hernández
- Sara Lorena Matute Cantón
- Brenda Paola Reséndiz Mendoza
- José Luis Elguera Lugo
---------------------------------------------------------------------------------------------------------------------------

# Prerequisitos 
La apicación corre con pyhton3, node v.27

# Ejecutar la aplicación por primera vez 

Si es a primera vez que estas corriendo la aplicación es necesario que sigas los siguientes pasos 

## Levantar la base de datos

Es necesario que primero se levante la base de datos.
esto se puede hacer desde la terminal siguiendo los siguientes comandos:
 1. sudo service mysqld start
   En este paso la terminal le pedira su contraseña. 
 2. mysql -u root -p
    En este paso la terminal le pedira su contraseña root.
    Una vez en el interprete de mysql tendrá que poner el siguiente comando

    source  ruta del archivo  TernuTianguis.sql 

    una vez montada la base de datos es necesario añadir unos usuarios, para esto en el mismo interprete de mysql use el siguiente comando

    source  ruta registrosBase.sql 

    Listo ya ha terminado de montar la base de datos.
----------------------------------------------------------------------------------------------------------------------------------
# Correr la aplicación 

## BackEnd

Para el backend se recominenda que se use un entorno virtual con el nombre de "venv" este tiene que estar en la carpeta root del projecto. Se incluye un archivo requirements.txt. Es importante que exista venv en la carpeta root, en el caso contrario puede haber problemas a la hora de levantar el backend.

Para levantar el backend es necesario que en terminal se encuetre adentro del directorio ternutianguis. Una vez ahi escriba el siguiente comando:

     npm run start-flask-app
     
Este comando activara el serivdor de flask.

## FrontEnd
En una terminal diferente a la que este corriendo el servidor flask, dirigase al directorio ternutianguis. Una vez adentro del directorio es necesario que escriba los siguientes comandos.

  npm i 
  
Este comando puede tardar un poco. Una vez termine escriba el siguiente comando:

npm start 

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Usuario valido 
correo: juan2@gmail.com 
contraseña: 1234






