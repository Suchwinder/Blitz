from flask import Flask
from models import bootDB
from routes import upload_image, create_group, get_group #create_group, join_group, s3_test

def create_app():
    bootDB() #start database (good to do database boot before app to ensure it exists before app works)
    app = Flask(__name__) #start app

    app.register_blueprint(create_group.bp)
    app.register_blueprint(get_group.bp)
    app.register_blueprint(upload_image.bp)

    return app
