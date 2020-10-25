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
        BUCKET = os.getenv('BUCKET')

        s3 = boto3.client(
            's3'
        ) # specifying amazon resource
        
        object_url = None

        # See if need to do personal check for IMAGE, IF EMPTY THEN 
        # WE SHOULDNT NEED TO CREATE A S3 CONNECTION AND JUST STORE IN DB
        # ANY EMPTY STRING; COULD BE BETTER TO DO IF BEFORE SO ERROR HANDLING BETTER

        if len(img) > 0:
            # give it a random name, cause same file names will replace each other
            letters = ''.join(random.choice(string.ascii_letters) for i in range(10))+'.jpeg'
            try:
                # https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html
                response = s3.upload_file(img, BUCKET, letters, ExtraArgs={ "ContentType": "image/jpeg"}) # (our img, name of aws bucket, and no object url so use same img), returns true or false
                object_url = f"https://{BUCKET}.s3.amazonaws.com/{letters}"

            except ClientError as e:
                logging.error(e)
                result = {'error': 'Image Upload Failed'}
                return result, 40
        
        # image uploaded now can start doing all appropriate insertions
        
        db_connection.close()


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
        result = {'error': 'Connection to Database Failed'}
        return result, 400
    
    db_connection.close()
