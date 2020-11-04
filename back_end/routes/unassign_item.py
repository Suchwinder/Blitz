from flask import Blueprint, request # create a blueprint for the routes to be registered to, not necessary but ood for modularization of routes
from models import create_db_connection, Groups, Users, Items, ItemAssignments # calling our helper function to create a connection to the databse to execute a request

bp = Blueprint('unassign_item', __name__, url_prefix='/api')
@bp.route('/unassign_item', methods=['POST'])

def unassign_item():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        # gather data
        user = data['nickname']
        item_name = data['item_name']
        group_url = data['group_url']

        # query the referenced groups for the caller user
        group_object = db_connection.query(Groups).filter(Groups.groupURL == group_url).first()
        user_object = db_connection.query(Users).filter((Users.nickname == user), (Users.groupID == group_object.groupID)).first()
        item_object = db_connection.query(Items).filter((Items.itemName == item_name), (Items.groupID == group_object.groupID)).first()

        # query data for price calculation
        curr_cost_per_person = item_object.itemCostPerPerson

        # see item-user pair exists
        item_user_exist = db_connection.query(ItemAssignments).filter((ItemAssignments.itemID == item_object.itemID), (ItemAssignments.userID == user_object.userID)).first()

        if not item_user_exist:
            response = {"error": "Assignment doesn't exist"}
            db_connection.close()
            return response, 404
        else:
            # get assignment pair id from itemAssignment table
            pair_id = item_user_exist.itemAssignmentID

            # delete assignment pair from itemAssignment table
            db_connection.query(ItemAssignments).filter(ItemAssignments.itemAssignmentID == pair_id).delete()

            # update current users cost
            curr_user_owes = user_object.amountOwed
            curr_user_update_owes = curr_user_owes - curr_cost_per_person

            # update amountOwed for user calling function
            db_connection.query(Users).filter(Users.userID == user_object.userID).update({"amountOwed": curr_user_update_owes})
            db_connection.commit()
            
            # -------- UPDATES AMOUNT OWED FOR ALL OTHER USERS ASSOCIATED WITH ITEM --------

            # gets new item count and new number of users associated with that item
            new_user_count = db_connection.query(ItemAssignments).filter((ItemAssignments.itemID == item_object.itemID)).count()

            # if user count == 0, treat as if 1 person
            if(new_user_count == 0):
                new_user_count = 1
            item_price = item_object.itemCost

            # change price per person on item
            new_per_person_price = round(item_price/new_user_count, 2)

            # commit new price per person on table Item
            db_connection.query(Items).filter(Items.itemID == item_object.itemID).update({"itemCostPerPerson": new_per_person_price})
            db_connection.commit()

            # update amount owed for all users associated with item
            item_assignment_object = db_connection.query(ItemAssignments).filter(ItemAssignments.itemID == item_object.itemID)

            # traverse through each assignment pair
            for assignments in item_assignment_object:
                # get user of assignment pair being looked at
                curr_pair_user = db_connection.query(Users).filter(Users.userID == assignments.userID).first()

                if(item_assignment_object.count() > 0):
                    # updates users current price owed
                    user_total = curr_pair_user.amountOwed - curr_cost_per_person + new_per_person_price
                    db_connection.query(Users).filter(Users.userID == assignments.userID).update({"amountOwed": user_total})
                    db_connection.commit()

            db_connection.close()

            # returns message saying item created
            response = {"message": f"{user} and {item_name} unpaired successfully"}
            return response, 200
    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400

    db_connection.close()