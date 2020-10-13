from flask import Flask
from models import bootDB
from back_end.routes import create_group

def create_app():
    bootDB() #start database (good to do database boot before app to ensure it exists before app works)
    app = Flask(__name__) #start app

    app.register_blueprint(create_group.bp)
    
    return app
