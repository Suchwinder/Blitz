from flask import Blueprint, request # create a blueprint for the routes to be registered to, not necessary but ood for modularization of routes
from models import create_db_connection, Groups # calling our helper function to create a connection to the databse to execute a request

bp = Blueprint('join_group', __name__, url_prefix='/api')

@bp.route('/join', methods=["GET"])
def join_group():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        url = data.url
        if(len(url) == 0):
            response = {'error': 'Please Enter a URL'}
            return response, 404

        # try to find URL in database
        user_session = None
        try:
            user_session = db_connection.query(Groups).filter(Groups.groupURL == f"{url}")
        except:
            response = {'error': 'URL Doesn\'t Exist'}
            return response, 404

        # need to find all users by groupid, find all items they are paired to, and each individual expenses
        

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
            'totalAdjustment': user_session.totalAdjustment 
        }
        

    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400
