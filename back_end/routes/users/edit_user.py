from flask import Blueprint, request
from models import create_db_connection, Groups, Users

bp = Blueprint('edit_user', __name__, url_prefix='/api')

@bp.route('/edit_user', methods=['PUT'])
def edit_user():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        nickname = data['nickname']
        new_nickname = data['new_nickname']
        adjusted_amount = data['adjusted_amount']
        group_url = data['group_url']


        # Find the group first
        group_object = db_connection.query(Groups).filter(Groups.groupURL == group_url).first() # use first to avoid accessing as array
        
        # Fetch the user
        user_exists = db_connection.query(Users).filter((Users.nickname == nickname),(Users.groupID == group_object.groupID)).first()

        if user_exists is None:
            response = {"error": "User doesn't exist"}
            return response, 400

        if len(new_nickname) and (new_nickname != nickname):
            # Check if nickname already exists
            new_user_exists = db_connection.query(Users).filter((Users.nickname == new_nickname),(Users.groupID == group_object.groupID)).first()
            if new_user_exists: 
                response = {"error": "Invalid, a user with new_nickname already exists"}
                db_connection.close()
                return response, 400
            
            # update works on array of data or bulk data not single entity apprently
            db_connection.query(Users).filter((Users.nickname == nickname),(Users.groupID == group_object.groupID)).update({
                "nickname": new_nickname,
            }) # https://docs.sqlalchemy.org/en/13/orm/query.html#sqlalchemy.orm.query.Query.update

        if adjusted_amount != user_exists.adjustedAmount:
            db_connection.query(Users).filter((Users.nickname == nickname),(Users.groupID == group_object.groupID)).update({
                "adjustedAmount": adjusted_amount
            })

        db_connesction.commit()
        db_connection.close()

        # returns message saying item created
        response = {"message": f"{nickname} successfully updated"}
        return response, 200

    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400
    
    db_connection.close()
        