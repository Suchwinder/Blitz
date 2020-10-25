from flask import Flask
from models import bootDB
from routes import s3_test #create_group, join_group, s3_test

def create_app():
    bootDB() #start database (good to do database boot before app to ensure it exists before app works)
    app = Flask(__name__) #start app

    # app.register_blueprint(create_group.bp)
    # app.register_blueprint(join_group.bp)
    app.register_blueprint(s3_test.bp)

    return app
