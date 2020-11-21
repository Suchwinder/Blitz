from server import create_app
from flask_socketio import SocketIO, emit

import os

if __name__ == "__main__":
    app = create_app()
    debug = os.getenv("FLASK_ENV") == "development"
    
    # app.run(host="0.0.0.0", debug=False, port=os.environ.get("PORT", 80))
    app.run(debug = debug)