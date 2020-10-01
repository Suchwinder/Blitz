# Blitz

## Requirements for React + Flask

- Node.js: The JavaScript runtime that you will use to run your frontend project.
- NPM: A package and project manager for Node.js applications.
- Python: A recent Python 3 interpreter to run the Flask backend on.

## Steps to setup this project
1.  Clone repository.

2.  In command-line, navigate to `/front_end` directory of this project.

3.  In one terminal, install Node packages:
    ```
    $ npm install
    ```

4.  To start the frontend (React):
    ```
    $ npm start
    ```

5.  In a second terminal, navigate to `/back_end/server` and set up the virtual environment for flask (this needs to be done only once)
    
    Mac/Linux:
    ```
    $ python3 -m venv venv
    ```
    Windows:
    ```
    $ python -m venv venv
    ```
    
6.  Now you can activate the virtual environment
    
    Mac/Linux:
    ```
    $ source venv/bin/activate
    ```
    Windows:
    ```
    $ venv\Scripts\activate
    ```

7.  Install dependencies from `requirements.txt`:
    ```
    $ pip install -r requirements.txt
    ```
    
8.  To run the back end first got to parent directory using `cd ..` the file path should now be `Blitz/back_end` then run:
    ```
    $ python main.py
    ```

9. To deactivate virtual environment:
    ```
    $ deactivate
    ```

## Contributors
- Suchwinder Singh
- David Yuen
- Kent Zhang
- Rohan Tohaan
