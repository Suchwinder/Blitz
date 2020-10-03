from server import create_app
import os

if __name__ == "__main__":
    app = create_app()
    debug = os.getenv('FLASK_ENV') == 'development' 
    app.run(debug = debug)
