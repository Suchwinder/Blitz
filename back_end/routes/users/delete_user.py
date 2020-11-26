from flask import Blueprint, request
from back_end.models import create_db_connection, Groups, Users, Items, ItemAssignments

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
        user_id = user_object.userID

        # Check if user doesn't exist
        if user_object is None:
            response = {"error": "User does not exists"}
            db_connection.close()
            return response, 404

        # get all item-user assignments associated with this item
        item_assignment_object = db_connection.query(ItemAssignments).filter(ItemAssignments.userID == user_object.userID)

        db_connection.query(Groups).filter(Groups.groupID == group_object.groupID).update({
            "userCount": group_object.userCount - 1,
            "totalAdjustment": (group_object.totalAdjustment - user_object.adjustedAmount)
        })
        db_connection.commit()

        # delete user if user is not assigned to any item
        if item_assignment_object.count() ==0:
            db_connection.query(Users).filter(Users.userID == user_id).delete()
            db_connection.commit()
            response = {"message": f"{user_nickname} successfully deleted"}
            return response, 200
        else:
            # loop through all items associated with user
            for user_pair in item_assignment_object:
                # retrieve information about currently indexed item
                curr_item = db_connection.query(Items).filter(Items.itemID == user_pair.itemID).first()

                # get current cost per person on item
                old_item_cost_per_person = curr_item.itemCostPerPerson

                # delete specific user-item assignment pair
                db_connection.query(ItemAssignments).filter(ItemAssignments.itemAssignmentID == user_pair.itemAssignmentID).delete()

                # gets new item count and new number of users associated with that item
                new_user_count = db_connection.query(ItemAssignments).filter((ItemAssignments.itemID == curr_item.itemID)).count()

                # if user count == 0, treat as if 1 person
                if(new_user_count == 0):
                    new_user_count = 1
                item_price = curr_item.itemCost

                # change price per person on item
                new_per_person_price = round(item_price/new_user_count, 2)

                # commit new price per person on table Item
                db_connection.query(Items).filter(Items.itemID == curr_item.itemID).update({"itemCostPerPerson": new_per_person_price})
                db_connection.commit()

                # retrieve remaining users paired with current item
                remaining_paired_users = db_connection.query(ItemAssignments).filter(ItemAssignments.itemID == curr_item.itemID)

                for pair in remaining_paired_users:
                    # get user of assignment pair being looked at
                    curr_pair_user = db_connection.query(Users).filter(Users.userID == pair.userID).first()

                    if(remaining_paired_users.count() > 0):

                        user_total = curr_pair_user.amountOwed - old_item_cost_per_person + new_per_person_price
                        db_connection.query(Users).filter(Users.userID == pair.userID).update({"amountOwed": user_total})
                        db_connection.commit()

            db_connection.query(Users).filter(Users.userID == user_id).delete()
            db_connection.commit()
            response = {"message": f"{user_nickname} successfully deleted"}
            return response, 200

    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400
    
    db_connection.close()