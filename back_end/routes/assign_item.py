from flask import Blueprint, request # create a blueprint for the routes to be registered to, not necessary but ood for modularization of routes
from models import create_db_connection, Groups, Users, Items, ItemAssignments # calling our helper function to create a connection to the databse to execute a request

bp = Blueprint('assign_item', __name__, url_prefix='/api')
@bp.route('/assign_item', methods=['POST'])

def assign_item():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        user = data['nickname']
        item_name = data['item_name']
        group_url = data['group_url']
        
        group_object = db_connection.query(Groups).filter(Groups.groupURL == group_url).first()
        user_object = db_connection.query(Users).filter((Users.nickname == user), (Users.groupID == group_object.groupID)).first()
        item_object = db_connection.query(Items).filter((Items.itemName == item_name), (Items.groupID == group_object.groupID)).first()

        item_user_exist = db_connection.query(ItemAssignments).filter((ItemAssignments.itemID == item_object.itemID), (ItemAssignments.userID == user_object.userId)).first()

        if item_user_exist:
            response = {"error": "Item & User already assigned"}
            db_connection.close()
            return response, 400
        else:
            pair_object = ItemAssignments(userID = user_object.userID, itemID = item_object.itemID)
            db_connection.add(pair_object)
            db_connection.commit()
            db_connection.close()

            # returns message saying item created
            response = {"message": f"{user} and " f"{item} paired successfully"}
            return response, 200

    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400

    db_connection.close()