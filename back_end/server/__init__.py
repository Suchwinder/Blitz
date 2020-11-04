from flask import Flask
from models import bootDB
from routes import assign_item, unassign_item
from routes.group import upload_image, create_group, get_group #create_group, join_group, s3_test

# User(s) Imports
from routes.users import create_user
from routes.users import edit_user

# Item(s) Imports
from routes.items import create_item

def create_app():
    bootDB() #start database (good to do database boot before app to ensure it exists before app works)
    app = Flask(__name__) #start app

    app.register_blueprint(create_group.bp)
    app.register_blueprint(get_group.bp)
    app.register_blueprint(upload_image.bp)
    
    # Register(s) User Functionality
    app.register_blueprint(create_user.bp)
    app.register_blueprint(edit_user.bp)

    # Register(s) Item Functionality
    app.register_blueprint(create_item.bp)

    # Register(s) Item-User Pair Functionality
    app.register_blueprint(assign_item.bp)
    app.register_blueprint(unassign_item.bp)

    return app
