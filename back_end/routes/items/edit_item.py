from flask import Blueprint, request
from models import create_db_connection, Groups, Users, Items, ItemAssignments

bp = Blueprint('edit_item', __name__, url_prefix='/api')

@bp.route('/edit_item', methods=['PUT'])
def edit_item():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        item_name = data['item_name']
        new_item_name = data['new_item_name']
        new_item_cost = data['new_item_cost']
        group_url = data['group_url']

        # Find the group first
        group_object = db_connection.query(Groups).filter(Groups.groupURL == group_url).first() # use first to avoid accessing as array
        
        # Find the item object
        item_object = db_connection.query(Items).filter((Items.itemName == item_name), (Items.groupID == group_object.groupID)).first()
     
        # Check if item doesn't exist
        if item_object is None:
            response = {"error": "Item does not exists"}
            db_connection.close()
            return response, 400

        if len(new_item_name) and (new_item_name != item_name):
            # Check if item with new name already exists
            new_item_exist = db_connection.query(Items).filter((Items.itemName == new_item_name), (Items.groupID == group_object.groupID)).first()
            if new_item_exist:
                response = {"error": "Invalid. An item with " f"{new_item_name} already exists."}
                db_connection.close()
                return response, 400
            
            # update item's name
            db_connection.query(Items).filter(Items.itemID == item_object.itemID).update({"itemName": new_item_name})
            db_connection.commit()
        
        # Get current cost per person
        old_item_cost_per_person = item_object.itemCostPerPerson

        if(new_item_cost != item_object.itemCost):
            # Get number of users associated with item
            user_count = db_connection.query(ItemAssignments).filter((ItemAssignments.itemID == item_object.itemID)).count()

            # new cost per person
            if(user_count >0):
                new_cost_per_person = round(new_item_cost/user_count, 2)
            else:
                new_cost_per_person = new_item_cost

            # get all item-user assignments associated with this item
            item_assignment_object = db_connection.query(ItemAssignments).filter(ItemAssignments.itemID == item_object.itemID)

            # update item's base cost
            db_connection.query(Items).filter(Items.itemID == item_object.itemID).update({"itemCost": new_item_cost})
            db_connection.commit()

            # update item's cost per person
            db_connection.query(Items).filter(Items.itemID == item_object.itemID).update({"itemCostPerPerson": new_cost_per_person})
            db_connection.commit()

            # traverse through each assignment pair
            for assignments in item_assignment_object:
                # get user of assignment pair being looked at
                curr_pair_user = db_connection.query(Users).filter(Users.userID == assignments.userID).first()

                if(item_assignment_object.count() > 0):
                    # updates users current price owed
                    user_total = curr_pair_user.amountOwed - old_item_cost_per_person + new_cost_per_person
                    db_connection.query(Users).filter(Users.userID == assignments.userID).update({"amountOwed": user_total})
                    db_connection.commit()

        db_connection.close()

        response = {"message": f"{item_name} successfully updated"}
        return response, 200


    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400
    
    db_connection.close()