from flask import Blueprint, request
from back_end.models import create_db_connection, Groups, Users, Items, ItemAssignments
from botocore.exceptions import ClientError
from back_end.receipt_processor import imageToJson 
import random, string, os, boto3, logging, random, string, uuid, io

bp = Blueprint('reupload', __name__, url_prefix='/api')

@bp.route('/reupload_image', methods=['POST'])
def reupload():
    db_connection = create_db_connection()
    if db_connection:
        # Need to move the contents from the request.data to the request.files
        request.get_data(parse_form_data = True)
        # Now can access the files
        data = request.files['file']
        group_url = request.files['group_url']

        # Need to get image url from group_url in order to delete it in S3
        group_object = db_connection.query(Groups).filter(Groups.groupURL == group_url).first()
        image_to_delete = group_object.imageURL

        # Need to use Boto3 to use AWS services 
        AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
        BUCKET = os.getenv('BUCKET')

        s3 = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY
        )  # specifying amazon resource        

        # Delete the image if we have one ––––––––––––––––––––––––––––––––––––-
        if(len(image_to_delete) != 0):
            # https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Object
            try:
                response = s3.delete_object(BUCKET, image_to_delete)

            except ClientError as e:
                logging.error(e)
                result = {'error': 'Image Deletion Failed'}
                return result, 400

        # Update User Expensis to 0 –––––––––––––––––––––––––––––––––––––––––––
        users_object = db_connection.query(Users).filter(Users.groupID == group_object.groupID) # should get an array of users
        logging.debug(" all users: ", users_object)

        for user in users_object:
            db_connection.query(Users).filter(Users.userID == user.userID).update({
                "amountOwed": 0,
            }) 
            db_connection.commit()
        
        # Delete all items and item assignments –––––––––––––––––––––––––––––––
        items_object = db_connection.query(Items).filter(Items.groupID == group_object.groupID)
        logging.debug(" all items: ", items_object)
        for item in items_object:
            item_id = item.itemID

            # get all item-user assignments associated with this item
            item_assignment_object = db_connection.query(ItemAssignments).filter(ItemAssignments.itemID == item_id)
            
            # if there assignments we will delete them
            if item_assignment_object is not None:
                for assignments in item_assignment_object:
                    # delete assignment pair from db
                    db_connection.query(ItemAssignments).filter(ItemAssignments.itemAssignmentID == assignments.itemAssignmentID).delete()
                    db_connection.commit()

            db_connection.query(Items).filter(Items.itemID == item_id).delete()
            db_connection.commit()

        # New Image Upload  –––––––––––––––––––––––––––––––––––––––––––––––––––
        # Convert the randomized value into a string
        # Give it a random name, cause same file names will replace each other
        letters = str(uuid.uuid4())

        object_url = None
        if data:
            try:
                # https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html
                response = s3.upload_fileobj(data, BUCKET, letters, ExtraArgs={ "ContentType": "image/jpeg"}) # (our img, name of aws bucket, and object url name would be awsurl+random letter we generated), returns true or false
                object_url = f"https://{BUCKET}.s3.amazonaws.com/{letters}"

            except ClientError as e:
                logging.error(e)
                result = {'error': 'Image Upload Failed'}
                return result, 400

        # Reprocess all the data –––––––––––––––––––––––––––––––––––––––––––––
        items_list = None
        # if we have an image to work with we need to process it
        if (len(object_url)>0):
            index = object_url.rfind('/')+1
            name = object_url[index:]

            BUCKET = os.getenv('BUCKET')
            REGION = os.getenv('REGION')
            s3cli = boto3.resource('s3', region_name=REGION)

            bucket = s3cli.Bucket(BUCKET)
            object = bucket.Object(name)
            tmp = tempfile.NamedTemporaryFile()

            with open(tmp.name, 'wb') as f:
                object.download_fileobj(f)
                items_list = imageToJson(tmp.name)

        items_total = 0   
        if items_list:    
            for item in items_list:
                item_object = Items(itemName = item['name'], itemCost = item['price'], itemQuantity = 1, itemCostPerPerson = item['price'], groupID = group_object.groupID)
                db_connection.add(item_object)
                items_total += item['price']
        
        db_connection.query(Groups).filter(Groups.groupURL == group_object.groupURL).update({
            "subTotal": items_total,
            "totalCost": (items_total)*(1.00875) + (items_total * group_object.tipRate/100)
        })

        db_connection.commit()

        response = {"message": "Successfully Reuploaded Image"}
        return response, 200
        # Assume on front end we call get group again after we reset everything

    else:
        result = {'error': 'Connection to Datavase Failed'}
        return result, 400

    db_connection.close()
