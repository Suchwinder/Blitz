# Blitz

## Requirements for React + Flask

Node.js: The JavaScript runtime that you will use to run your frontend project.
Yarn: A package and project manager for Node.js applications.
Python: A recent Python 3 interpreter to run the Flask backend on.

```
$ pip install virtualenv
$ pip install flask python-dotenv
```

## Steps to setup this project
1.  Clone repository.

2.  In command-line, navigate to /blitz_gg/ directory of this project. Have two terminals open, for frontend and backend.

3.  In the one terminal, start the frontend(React):
    $ npm start

4.  For the second terminal, activate the virtual environment for flask
    Mac/Linux:
    ```
    $ python3 -m venv venv
    $ source venv/bin/activate
    ```

    Windows:
    ```
    $ python -m venv venv
    $ venv\Scripts\activate
    ```

5.  Start the flask(on second terminal) after frontend(React):
    Mac/Linux:
    ```
    $ cd api && venv/bin/flask run --no-debugger
    ```

    Windows:
    ```
    $ cd api && venv\Scripts\flask run --no-debugger
    ```

## Contributors
Suchwinder Signh
David Yuen
Kent Zhang
Rohan Tohaan