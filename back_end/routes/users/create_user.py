from flask import Blueprint, request
from models import create_db_connection, Groups, Users

bp = Blueprint('create_user', __name__, url_prefix='/api')

@bp.route('/create_user', methods=['POST'])
def create_user():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        user = data['nickname']
        group_url = data['group_url']

        # Find the group first
        group_object = db_connection.query(Groups).filter(Groups.groupURL == group_url).first() # use first to avoid accessing as array

        # Check if nickname already exists
        user_exists = db_connection.query(Users).filter((Users.nickname == user),(Users.groupID == group_object.groupID)).first()
        
        if user_exists: 
            response = {"error": "User already exists"}
            db_connection.close()
            return response, 400
        
        else:
            user_object = Users(nickname = user, amountOwed = 0.0, adjustedAmount = 0.0, groupID = group_object.groupID)
            db_connection.add(user_object)
            db_connection.commit()
            db_connection.close()
            
            # returns user name
            response = {"message": f"{user} successfully created"}
            return response, 200

    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400
    
    db_connection.close()
        