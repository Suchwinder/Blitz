from flask import Flask
from back_end.models import bootDB
from back_end.routes.group import (
    upload_image,
    create_group,
    get_group,
    edit_tip_rate,
)  # create_group, join_group, s3_test
from back_end.routes import assign_item, unassign_item

# User(s) Imports
from back_end.routes.users import create_user, edit_user, delete_user

# Item(s) Imports
from back_end.routes.items import create_item, edit_item, delete_item

from flask_socketio import SocketIO, emit, disconnect

def create_app():
    bootDB()  # start database (good to do database boot before app to ensure it exists before app works)
    app = Flask(
        __name__, static_folder="../../front_end/build", static_url_path="/"
    )  # start app

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    # For react router error handling
    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file("index.html")

    app.register_blueprint(create_group.bp)
    app.register_blueprint(get_group.bp)
    app.register_blueprint(upload_image.bp)
    app.register_blueprint(edit_tip_rate.bp)

    # Register(s) User Functionality
    app.register_blueprint(create_user.bp)
    app.register_blueprint(edit_user.bp)
    app.register_blueprint(delete_user.bp)

    # Register(s) Item Functionality
    app.register_blueprint(create_item.bp)
    app.register_blueprint(edit_item.bp)
    app.register_blueprint(delete_item.bp)

    # Register(s) Item-User Pair Functionality
    app.register_blueprint(assign_item.bp)
    app.register_blueprint(unassign_item.bp)

    print("completed")
    # socketio = SocketIO(app)
    # @socketio.on('asd')
    # def echo_connect():
    #     emit('asd')
    #     print('Client has connected')

    # @socketio.on('new_update')
    # def handleUpdate():
    #     emit('new_update', broadcast=True)
    
    # @socketio.on('disconnect')
    # def echo_disconnect():
    #     print('Client has disconnected')

    # return socketio.run(app, debug=True)
    return app
