from flask import Flask
from models import bootDB
from routes import upload_image, create_group, users #create_group, join_group, s3_test

# User Imports
from routes.users import create_user


def create_app():
    bootDB() #start database (good to do database boot before app to ensure it exists before app works)
    app = Flask(__name__) #start app

    app.register_blueprint(create_group.bp)
    # app.register_blueprint(join_group.bp)
    app.register_blueprint(upload_image.bp)
    
    # Register User Functionality
    app.register_blueprint(create_user.bp)

    return app
