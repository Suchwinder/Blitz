from back_end.server import create_app
from flask_socketio import SocketIO, emit
import logging # to see logs for gunicorn
logging.basicConfig(level='DEBUG')

app = create_app()
socketio = SocketIO(app) # no need for cors 

@socketio.on('new_update', namespace='/socket')
def handleUpdate():
    emit('new_update', '', broadcast=True)

