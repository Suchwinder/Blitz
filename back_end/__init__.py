from back_end.server import create_app
from flask_socketio import SocketIO, emit
import logging
logging.basicConfig(level='DEBUG')

app = create_app()
print("app created")
socketio = SocketIO(app) # no need for cors 

print(socketio)

@socketio.on('asd', namespace="/socket")
def echo_connect():
    logging.debug("this man") # need for gunicorn logging
    print("trying to connect")
    emit('asd')
    print('Pretend Client has connected')

# @socketio.on('new_update')
# def handleUpdate():
#     emit('new_update', broadcast=True)

# @socketio.on('disconnect')
# def echo_disconnect():
#     print('Client has disconnected')

# print("ending before socket run")
# socketio.run(app, cors_allowed_origin="*")
# print("ending after socket run")
