from flask import Blueprint, request
from models import create_db_connection, Groups, Users, Items, ItemAssignments

bp = Blueprint('delete_user', __name__, url_prefix='/api')

@bp.route('/delete_user', methods=['DELETE'])
def delete_user():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        user_nickname = data['nickname']
        group_url = data['group_url']

        # Find the group first
        group_object = db_connection.query(Groups).filter(Groups.groupURL == group_url).first() # use first to avoid accessing as array

        # Find the item object
        user_object = db_connection.query(Users).filter((Users.nickname == user_nickname),(Users.groupID == group_object.groupID)).first()
        user_id = user_object.itemID

        # Check if user doesn't exist
        if user_object is None:
            response = {"error": "User does not exists"}
            db_connection.close()
            return response, 404

        # get all item-user assignments associated with this item
        item_assignment_object = db_connection.query(ItemAssignments).filter(ItemAssignments.userID == user_object.userID)

        # delete user if user is not assigned to any item
        if item_assignment_object is None:
            db_connection.query(Users).filter(Users.userID == user_id).delete()
            db_connection.commit()
            response = {"message": f"{user_nickname} successfully deleted"}
            return response, 200
        else:
            pass
            # loop through all items associated with user
            # for item_assignments in item_assignment_object:
            #     curr_item = db_connection.query(Items).filter(Items.itemID == item_assignments.itemID).first()

            #     # find all assignments associated with current item
            #     curr_item_pairs = db_connection.query(ItemAssignments).filter(ItemAssignments.itemID == curr_item.itemID)

    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400
    
    db_connection.close()