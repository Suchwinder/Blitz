from server import create_app
import os

@app.route("/")
def index():
    return app.send_static_file("index.html")


# For react router error handling
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app = create_app()
    # debug = os.getenv("FLASK_ENV") == "development"
    app.run(host="0.0.0.0", debug=False, port=os.getenviron.get("PORT", 80))

