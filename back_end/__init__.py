from back_end.server import create_app
from flask_socketio import SocketIO, emit

app = create_app()
print("app created")
socketio = SocketIO(app)

print(socketio)

@socketio.on('asd')
def echo_connect():
    print("trying to connect")
    # emit('asd')
    print('Pretend Client has connected')

@socketio.on('new_update')
def handleUpdate():
    emit('new_update', broadcast=True)

@socketio.on('disconnect')
def echo_disconnect():
    print('Client has disconnected')

# print("ending before socket run")
# socketio.run(app, cors_allowed_origin="*")
# print("ending after socket run")
