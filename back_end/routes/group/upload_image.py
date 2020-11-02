from flask import Blueprint, request # create a blueprint for the routes to be registered to, not necessary but ood for modularization of routes
from models import create_db_connection, Groups # calling our helper function to create a connection to the databse to execute a request
from botocore.exceptions import ClientError # for exception handling
import random, string, os, boto3, logging, random, string, uuid, io

# used to group a bunch of relted views together
# views in this case can count as code written to create various endpoints
bp = Blueprint('upload', __name__, url_prefix='/api')

@bp.route('/upload_image', methods=["POST"])
def upload():
    db_connection = create_db_connection()
    if db_connection:
        # Need to move the contents from the request.data to the request.files
        request.get_data(parse_form_data = True)
        # Now can access the files
        data = (request.files['file'])        
        # convert the randomized value into a string
        # give it a random name, cause same file names will replace each other
        letters = str(uuid.uuid4())

        # Need to use Boto3 to use AWS services
        # AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
        # AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
        BUCKET = os.getenv('BUCKET')
        # FOLDER = os.getenv('FOLDER')
        
        s3 = boto3.client(
            's3'# ,
            # aws_access_key_id=AWS_ACCESS_KEY_ID, 
            # aws_secret_access_key=AWS_SECRET_ACCESS_KEY
        ) # specifying amazon resource
        
        object_url = None
        if data:
            try:
                # https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html
                response = s3.upload_fileobj(data, BUCKET, letters, ExtraArgs={ "ContentType": "image/jpeg"}) # (our img, name of aws bucket, and no object url so use same img), returns true or false
                object_url = f"https://{BUCKET}.s3.amazonaws.com/{letters}"

            except ClientError as e:
                logging.error(e)
                result = {'error': 'Image Upload Failed'}
                return result, 400
        
        db_connection.close()

        return {"message":f"{object_url}"}, 200
        
    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400
        
    db_connection.close()
