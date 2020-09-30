from server import create_app

if __name__ == "main":
    app = create_app()
    app.run(debug = True)