from flask import Blueprint, request # create a blueprint for the routes to be registered to, not necessary but ood for modularization of routes
from models import create_db_connection, Groups, Users, Items, ItemAssignments # calling our helper function to create a connection to the databse to execute a request
import datetime

bp = Blueprint('get_group', __name__, url_prefix='/api')

@bp.route('/get', methods=["GET"])
def get_group():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        url = data['url']
        if(len(url) == 0):
            response = {'error': 'Please Enter a URL'}
            return response, 404

        # try to find URL in database
        user_session = None
        try:
            user_session = db_connection.query(Groups).filter(Groups.groupURL == f"{url}")[0]
        except:
            response = {'error': 'URL Doesn\'t Exist'}
            return response, 404

        # check if link is expired
        if (datetime.datetime.now() > user_session.linkExpiration):
            response = {'error': 'URL Has Expired'}
            return response, 403


        # gets all the users in the group
        user_obj = db_connection.query(Users).filter(Users.groupID == user_session.groupID)
        user_list = []
        for row in user_obj:
            user_list.append(row.nickname)

        # gets all the items in the group
        items_obj = db_connection.query(Items).filter(Items.groupID == user_session.groupID)
        items_list = {}
        for row in items_obj:
            items_list[row.itemName] = row.itemCost

        # for user in user_obj:
        #     user_assignments = db_connection.query(User)
        # need to find all users by groupid, find all items they are paired to, and each individual expenses
        # assignments = {}
        # for row in items_obj:
        #     temp_users = []
        #     users_of_items = db_connection.query(Users).filter(Users.userID == row.userID)
        #     for row2 in users_of_items:
        #         temp_users.append(row2.nickname)
        #     assignments[row.itemName] = temp_users
        
        # user_item_obj = db_connection.query(ItemAssignments).filter

        # Now return all the necessary data
        response = {
            'groupID': user_session.groupID,
            'groupURL': user_session.groupURL,
            'locationID': user_session.locationID, 
            'imageURL': user_session.imageURL,
            'tipRate': user_session.tipRate, 
            'subTotal': user_session.subTotal, 
            'totalCost': user_session.totalCost, 
            'linkExpiration': user_session.linkExpiration,  
            'userCount': user_session.userCount,
            'totalAdjustment': user_session.totalAdjustment, 
            'users': user_list,
            'items': items_list
        }

        return response, 200
        

    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400
