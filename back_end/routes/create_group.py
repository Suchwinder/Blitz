from flask import Blueprint, request # create a blueprint for the routes to be registered to, not necessary but ood for modularization of routes
from models import create_db_connection, Groups # calling our helper function to create a connection to the databse to execute a request
from botocore.exceptions import ClientError # for exception handling
import random, string, os, boto3, logging

# used to group a bunch of relted views together
# views in this case can count as code written to create various endpoints
bp = Blueprint('create_group', __name__, url_prefix='/api')

@bp.route('/create', methods=("POST"))
def create_group():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        # gather data
        users = data.names
        street_address = data.streetAddress
        state = "NY"
        city = data.city
        location_name = data.locationName
        zip = data.zip
        image = data.image

        # Need to use Boto3 to use AWS services
        AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
        BUCKET = os.getenv('BUCKET')

        s3 = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY_ID, 
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY
        ) # specifying amazon resource
        
        object_url = None

        # See if need to do personal check for IMAGE, IF EMPTY THEN 
        # WE SHOULDNT NEED TO CREATE A S3 CONNECTION AND JUST STORE IN DB
        # ANY EMPTY STRING; COULD BE BETTER TO DO IF BEFORE SO ERROR HANDLING BETTER

        if len(image) > 0:
            try:
                # https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html
                response = s3.upload_file(image, BUCKET, image) # (our image, name of aws bucket, and no object url so use same image), returns true or false
                object_url = f"https://{BUCKET}.s3.amazonaws.com/{image}"

            except ClientError as e:
                logging.error(e)
                result = {'error': 'Image Upload Failed'}
                return result, 400
        
        # image uploaded now can start doing all appropriate insertions
        

        # new_group = Groups()
        # some means to store image 
        # processing for items?

        # get state info from zip, and id, and taxrate
        # insert the information
        # store image on CDN

        #once stored need random link in response
        letters = ''.join(random.choice(string.ascii_letters) for i in range(26))
        digits = ''.join(random.choice(string.digits) for i in range(10))
        result_string = letters + '_' + digits
        response = {'link': result_string
                    'id': }

    else:
        result = {'error': 'Connection to Dataabse Failed'}
        return result, 400
    
    db_connection.close()
