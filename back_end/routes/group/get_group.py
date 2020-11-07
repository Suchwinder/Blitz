from flask import Blueprint, request # create a blueprint for the routes to be registered to, not necessary but ood for modularization of routes
from models import create_db_connection, Groups, Users, Items, ItemAssignments, Zips, Locations # calling our helper function to create a connection to the databse to execute a request
import datetime

bp = Blueprint('get_group', __name__, url_prefix='/api')

@bp.route('/get_group/', methods=["GET"])
def get_group():
    # print(group)
    db_connection = create_db_connection()
    if db_connection:
        url = request.args['group_URL']

        if(len(url) == 0):
            response = {'error': 'Please Enter a URL'}
            return response, 404

        # try to find URL in database        
        user_session = db_connection.query(Groups).filter(Groups.groupURL == url).first()

        if user_session is None:
            response = {"error": "URL doesn't exist"}
            return response, 400
        
        # check if link is expired
        if (datetime.datetime.now() > user_session.linkExpiration):
            response = {'error': 'URL Has Expired'}
            return response, 403

        response = {
            # 'groupID': user_session.groupID,
            'group_url': user_session.groupURL,
            # 'locationID': user_session.locationID, 
            'image_url': user_session.imageURL,
            'tip_rate': user_session.tipRate, 
            'sub_total': user_session.subTotal, 
            'total_cost': user_session.totalCost, 
            'tax_rate': 1.08875,
            # 'linkExpiration': user_session.linkExpiration,  
            'user_count': user_session.userCount,
            'total_adjustment': user_session.totalAdjustment 
        }

        # need to get location information
        location_object = db_connection.query(Locations).filter(Locations.locationID == user_session.locationID).first()
        
        response['location_name'] = location_object.locationName
        response['street_address'] = location_object.streetAddress
        response['city'] = location_object.city

        # zip info
        zip_object = None
        if location_object:
            zip_object = db_connection.query(Zips).filter(Zips.zipID == location_object.zipID).first()
            response['zip_code'] = zip_object.zipCode
        else:
            response['zip_code'] = -1
        
        response['state_name'] = 'NY'

        # need to find all users by groupid, find all items they are paired to, and each individual expenses
        # get all users
        users = db_connection.query(Users).filter(Users.groupID == user_session.groupID).order_by(Users.userID)
        
        total_users = []
        user_assignments = {}
        for user in users:
            user_object = { 
                'user_nickname': user.nickname,
                'user_amount_owed': user.amountOwed,
                'user_adjusted_amount': user.adjustedAmount
            }
            total_users.append(user_object)
            user_assignments[user.nickname] = []

        # get all items
        items = db_connection.query(Items).filter(Items.groupID == user_session.groupID).order_by(Items.itemID)

        total_items = []
        items_assignments = {}
        for item in items:
            item_object = {
                'item_name': item.itemName,
                'item_cost': item.itemCost
            }
            total_items.append(item_object)

            # i_a = {item.itemName: []}
            # items_assignments.append(i_a)
            items_assignments[item.itemName] = []

        # get all item assignments
        for item in items_assignments:
            # first get item name from your assignments array
            # item_name = list(item.keys())[0] # has only one key always
            item_name = item
            # then use item name to get item object to get id
            item_object = db_connection.query(Items).filter((Items.groupID == user_session.groupID),(Items.itemName == item_name)).first()
            item_id = item_object.itemID
            # use id to get an array of item assignments for that specific item to all the users connected to it
            i_a = db_connection.query(ItemAssignments).filter(ItemAssignments.itemID == item_id)
            # get user id now to get the name of the person and append it to the value of our dictionary items_assignments
            for assignment in i_a:
                user_name = db_connection.query(Users).filter(Users.userID == assignment.userID).first()
                # item[item_name].append(user_name)
                items_assignments[item].append(user_name.nickname)

        # get user assignments 
        for user_nickname in user_assignments:
            #get user object to get user id to traverse through assignments
            user_object = db_connection.query(Users).filter((Users.groupID == user_session.groupID), (Users.nickname == user_nickname)).first()
            user_id = user_object.userID
            #use id to get an array of items assignments for this specific user
            u_a = list(db_connection.query(ItemAssignments).filter(ItemAssignments.userID == user_id))
            #get item id to get the name of the item and append it to the value of our dicitonary user_assignments
            for assignment in u_a:
                item_name = db_connection.query(Items).filter(Items.itemID == assignment.itemID).first()
                user_assignments[user_nickname].append(item_name.itemName)

        db_connection.commit()

        response['users'] = total_users
        response['items'] = total_items
        response['item_assignments'] = items_assignments
        response['user_assignments'] = user_assignments

        db_connection.close()

        return response, 200

        # Now return all the necessary data
        
    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400

    db_connection.close()
