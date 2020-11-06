from flask import Blueprint, request
from models import create_db_connection, Groups, Users, Items, ItemAssignments

bp = Blueprint('delete_item', __name__, url_prefix='/api')

@bp.route('/delete_item', methods=['DELETE'])
def delete_item():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        item_name = data['item_name']
        group_url = data['group_url']

        # Find the group first
        group_object = db_connection.query(Groups).filter(Groups.groupURL == group_url).first() # use first to avoid accessing as array

        # Find the item object
        item_object = db_connection.query(Items).filter((Items.itemName == item_name), (Items.groupID == group_object.groupID)).first()
        item_id = item_object.itemID

        # Check if item doesn't exist
        if item_object is None:
            response = {"error": "Item does not exists"}
            db_connection.close()
            return response, 404

        item_cost_per_person = item_object.itemCostPerPerson

        # get all item-user assignments associated with this item
        item_assignment_object = db_connection.query(ItemAssignments).filter(ItemAssignments.itemID == item_object.itemID)

        if item_assignment_object is None:
            db_connection.query(Items).filter(Items.itemID == item_id).delete()
            response = {"message": f"{item_name} successfully deleted"}
            return response, 200
        else:
            for assignments in item_assignment_object:
                # get user of assignment pair being looked at
                curr_pair_user = db_connection.query(Users).filter(Users.userID == assignments.userID).first()

                user_total = curr_pair_user.amountOwed - item_cost_per_person

                db_connection.query(Users).filter(Users.userID == assignments.userID).update({"amountOwed": user_total})
                db_connection.commit()

                db_connection.query(ItemAssignments).filter(ItemAssignments.itemAssignmentID == item_id).delete()

            db_connection.query(Items).filter(Items.itemID == item_id).delete()
            response = {"message": f"{item_name} successfully deleted"}
            return response, 200

    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400
    
    db_connection.close()
