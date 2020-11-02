from flask import Flask
from models import bootDB
<<<<<<< HEAD
from routes import upload_image, create_group, users, assign_item #create_group, join_group, s3_test

# User(s) Imports
from routes.users import create_user

# Item(s) Imports
from routes.items import create_item

=======
from routes import upload_image, create_group, get_group #create_group, join_group, s3_test
>>>>>>> 95916e0845f5e5ad2de1870edde710fed2de10c7

def create_app():
    bootDB() #start database (good to do database boot before app to ensure it exists before app works)
    app = Flask(__name__) #start app

    app.register_blueprint(create_group.bp)
    app.register_blueprint(get_group.bp)
    app.register_blueprint(upload_image.bp)
    
    # Register(s) User Functionality
    app.register_blueprint(create_user.bp)

    # Register(s) Item Functionality
    app.register_blueprint(create_item.bp)

    app.register_blueprint(assign_item.bp)

    return app
