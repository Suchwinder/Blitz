from flask import Blueprint, request # create a blueprint for the routes to be registered to, not necessary but ood for modularization of routes
from models import create_db_connection, Groups, Locations, Users, Items, Zips # calling our helper function to create a connection to the databse to execute a request
from receipt_processor import imageToJson #image processing
import random, string, os, datetime, boto3, tempfile

# used to group a bunch of relted views together
# views in this case can count as code written to create various endpoints
bp = Blueprint('create_group', __name__, url_prefix='/api')

@bp.route('/create', methods=["POST"])
def create_group():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        # gather data
        users = data['names']
        street_address = data['streetAddress']
        # state_location = "NY"
        city_location = data['city']
        location_name = data['locationName']
        zip_code = data['zip']
        image_s3url = data['s3url']
        # items_list = data['items']
        
        # if we have an image to work with we need to process it
        if (len(image_s3url)>0):
            index = image_s3url.rfind('/')+1
            name = image_s3url[index:]

            BUCKET = os.getenv('BUCKET')
            REGION = os.getenv('REGION')
            s3cli = boto3.resource('s3', region_name=REGION)
            # bucketname = 'testblitztest'
            # file_to_read = 'unknown2.png'
            bucket = s3cli.Bucket(BUCKET)
            object = bucket.Object(name)

            # object = s3cli.Bucket('testblitztest').Object('unknown.png')
            # fileobj = s3cli.get_object(Bucket = bucketname, Key = file_to_read)
            tmp = tempfile.NamedTemporaryFile()

            items_list = None
            with open(tmp.name, 'wb') as f:
                object.download_fileobj(f)
                items_list = imageToJson(tmp.name)

        # location_zip_obj = ["zipID": -1] # -1 will link the zip to state to 2 it to a state called "NOTHING"
        # if(len(zip_code) > 0):
        # Need to insert data with respect to foreign keys, so location is first so group can use location as FK, then Group is done so user and items can use group as FK, and user and item can be done in any order
        # create location object to insert into database
        if (zip_code == 0):
            response = {"error": "Please enter a valid address"}
            return response, 404
        
        if (len(location_name) == 0):
            response = {"error": "Please enter a location name"}
            return response, 404
        
        if (len(users) == 0):
            response = {"error": "Please enter at least one user"}
            return response, 404

        # location is mandatory
        location_zip_obj = db_connection.query(Zips).filter(Zips.zipCode == str(zip_code)) # returns an array of results, but it is size 1
        
        location_object = Locations(streetAddress = street_address, city = city_location, zipID = location_zip_obj[0].zipID, locationName = location_name)
        db_connection.add(location_object)
        db_connection.commit() # need to commit first in order to have ID

        # once stored location can do Group creation next
        # need random link in response

        letters = ''.join(random.choice(string.ascii_letters) for i in range(26))
        digits = ''.join(random.choice(string.digits) for i in range(10))
        result_string = "http://localhost:3000/split_bill/"+letters + '_' + digits
        
        group_object = Groups(groupURL = result_string, locationID = location_object.locationID, imageURL = image_s3url, tipRate = 0.0, subTotal = 0.0, totalCost = 0.0, linkExpiration = (datetime.datetime.now()+datetime.timedelta(days=30)), userCount = len(users), totalAdjustment = 0.0, isDeleted = False)
        db_connection.add(group_object)
        db_connection.commit() # need to commit first so it has id before we se in items and users table

        for user in users:
            user_object = Users(nickname = user, amountOwed = 0.0, adjustedAmount = 0.0, groupID = group_object.groupID)
            db_connection.add(user_object)
        
        for item in items_list:
            item_object = Items(itemName = item['name'], itemCost = item['price'], itemQuantity = 1, groupID = group_object.groupID)
            db_connection.add(item_object)
        
        db_connection.commit()
        response = {'link': result_string,
                    'message': "Successfully Created Group"}
        return response, 200

    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400
    
    db_connection.close()
