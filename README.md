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

7.  Exit out of the back_end directory using `cd ..` and install dependencies from `requirements.txt`:
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
    dotenv -f .env run python main.py
    ```
    Instead of the above commands you can use gunicorn to run this application (and for this to work need a build ready to be served) to do that please go into front end and run ```npm run build```. Also be ensure you have it installed (it should be if used command 7).
    Then make sure you are in the root directory of this app. From there run:
    ```
    gunicorn -e "DATABASE_URL=<insert database url (can make it localhost based)>" -e "FLASK_ENV=development" -e "AWS_ACCESS_KEY_ID=<in order to access bucket need some credential>" -e "AWS_SECRET_ACCESS_KEY=<in order to access bucket need some credential>" -e "BUCKET=<bucketname>" -e "REGION=<bucket region>" "--bind=127.0.0.1:5000" back_end:app
    ```
    Another option is if you do not wish to run this application with a build, then you may use the following command in the root directory of Blitz. 
    ```
    export PYTHONPATH="$(pwd)" && dotenv -f back_end/.env run python back_end/main.py
    ``` 
    Running the gunicorn or python run command in a editor may cause issues, best way is to use the default terminal provided by your machine. Also note gunicorn version and 
    export python will not work with windows OS.

9. To deactivate virtual environment:
    ```
    $ deactivate
    ```

## Contributors
- Suchwinder Singh
- David Yuen
- Kent Zhang
- Rohan Tohaan
