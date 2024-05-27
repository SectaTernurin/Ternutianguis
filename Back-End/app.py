from flask import Flask, redirect, render_template, url_for, request, flash, session
from alchemyClasses import db
from controller.generalController import generalController
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://adminTernu:TernuTianguis.Admin2024@localhost:3306/TernuTianguis'
app.register_blueprint(generalController)
app.config['SECRET_KEY'] = 'dev'

db.init_app(app)




@app.route('/')
def hello_world():
    return "hello world"



if __name__ == '__main__':
    app.run()
