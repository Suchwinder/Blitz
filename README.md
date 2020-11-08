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

5.  In a second terminal, navigate to `/back_end` and set up the virtual environment for flask (this needs to be done only once)
    
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
    
8.  ~~To run the back end normally do:~~
    ```
    $ python main.py
    ``` 
    ~~but if we are working with environment variables and load it normally through the database create function~~
    ~~the env variable wont be loaded in fast enough, so it would be type None. To fix this load env variables before~~
    ~~hand through terminal, refer to github docs. The command is:~~
    ```
    ~~dotenv -f .env run python main.py~~
    ```
    Instead of the above commands you can use gunicorn to run this application. To do this you must ensure you have it installed (it should be if used command 7).
    Then make sure you are in the root directory of this app. From their run:
    ```
    gunicorn -e "DATABASE_URL=<insert database url (can make it localhost based)>" -e "FLASK_ENV=development" -e "AWS_ACCESS_KEY_ID=<in order to access bucket need some credential>" -e "AWS_SECRET_ACCESS_KEY=<in order to access bucket need some credential>" -e "BUCKET=<bucketname>" -e "REGION=<bucket region>" "--bind=127.0.0.1:5000" back_end:app
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
