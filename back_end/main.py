from server import create_app
from flask_socketio import SocketIO, emit

import os

if __name__ == "__main__":
    # print("begin create app")
    app = create_app()
    # print("end create app")
    debug = os.getenv("FLASK_ENV") == "development"

    # print("in main")
    # socketio = SocketIO(app)

    # print(socketio)

    # @socketio.on('asd')
    # def echo_connect():
    #     print("trying to connect")
    #     emit('asd')
    #     print('Client has connected')

    # @socketio.on('new_update')
    # def handleUpdate():
    #     emit('new_update', broadcast=True)
    
    # @socketio.on('disconnect')
    # def echo_disconnect():
    #     print('Client has disconnected')
    
    # socketio.run(app, debug=True)
    # app.run(host="0.0.0.0", debug=False, port=os.environ.get("PORT", 80))
    app.run(debug = debug)
    return
