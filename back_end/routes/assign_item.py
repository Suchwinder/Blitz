from flask import Blueprint, request # create a blueprint for the routes to be registered to, not necessary but ood for modularization of routes
from back_end.models import create_db_connection, Groups, Users, Items, ItemAssignments # calling our helper function to create a connection to the databse to execute a request

bp = Blueprint('assign_item', __name__, url_prefix='/api')
@bp.route('/assign_item', methods=['POST'])

def assign_item():
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

        if(user_object is None):
            response = {"error": "This user doesn't exist"}
            return response, 400

        # query data for price calculation
        curr_cost_per_person = item_object.itemCostPerPerson

        # see item-user pair exists
        item_user_exist = db_connection.query(ItemAssignments).filter((ItemAssignments.itemID == item_object.itemID), (ItemAssignments.userID == user_object.userID)).first()

        if item_user_exist:
            response = {"error": "Item & User already assigned"}
            db_connection.close()
            return response, 400
        else:
            # calculate the new price per person when we add this new person
            new_user_count = db_connection.query(ItemAssignments).filter((ItemAssignments.itemID == item_object.itemID)).count() + 1
            item_price = item_object.itemCost
            new_cost_per_person = round(item_price/new_user_count, 2)

            # update Items with the new cost per person
            db_connection.query(Items).filter(Items.itemID == item_object.itemID).update({"itemCostPerPerson": new_cost_per_person})

            # update amount owed for current users associated with item
            item_assignment_object = db_connection.query(ItemAssignments).filter(ItemAssignments.itemID == item_object.itemID)

            # traverse through each assignment pair
            for assignments in item_assignment_object:
                # get user of assignment pair being looked at
                curr_pair_user = db_connection.query(Users).filter(Users.userID == assignments.userID).first()

                # calculates currently assigned user by subtracting previous cost_per_person with new_cost_per_person
                user_total = curr_pair_user.amountOwed - curr_cost_per_person + new_cost_per_person
                db_connection.query(Users).filter(Users.userID == assignments.userID).update({"amountOwed": user_total})
                db_connection.commit()
                
            # calculate desired new user's amountOwed
            curr_user_owes = user_object.amountOwed
            curr_user_update_owes = curr_user_owes + new_cost_per_person

            # update amountOwed for user in db
            db_connection.query(Users).filter(Users.userID == user_object.userID).update({"amountOwed": curr_user_update_owes})
            db_connection.commit()
            
            # create and commit pair to db
            pair_object = ItemAssignments(userID = user_object.userID, itemID = item_object.itemID)
            db_connection.add(pair_object)
            db_connection.commit()
            
            db_connection.close()

            # returns message saying item created
            response = {"message": f"{user} and {item_name} paired successfully"}
            return response, 200

    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400

    db_connection.close()