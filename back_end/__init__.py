from back_end.server import create_app
from flask_socketio import SocketIO, emit, join_room, leave_room
import logging # to see logs for gunicorn
logging.basicConfig(level='DEBUG')

app = create_app()
socketio = SocketIO(app) # no need for cors 

# Broadcasts update when a client makes an update
@socketio.on('new_update', namespace='/socket')
def handleUpdate(data):
    # logging.debug("The CONTENTS ARE: ", data)
    emit('new_update', '', broadcast=True, room=data)

# Makes client join a room for the groups' bill
@socketio.on('join', namespace='/socket')
def on_join(data):
    room = data['room']
    join_room(room)
    logging.debug("Successfully joined room")

@socketio.on('leave', namespace='/socket')
def on_leave(data):
    room = data['room']
    leave_room(room)
    logging.debug("Successfully left room")
