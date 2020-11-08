from flask import Blueprint, request
from back_end.models import create_db_connection, Groups, Items

bp = Blueprint('create_item', __name__, url_prefix='/api')

@bp.route('/create_item', methods=['POST'])
def create_item():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        item_name = data['item_name']
        item_cost = float(data['item_cost'])
        item_quantity = 1 # data['item_amount'] for now just storing it as one
        group_url = data['group_url']

        if item_cost <= 0:
            response = {"error": "Item cannot be worth a negative amount or 0"}
            return response, 400
        if len(item_name) == 0:
            response = {"error": "Please add a name for this new item"}
            return response, 400
        # Find the group first
        group_object = db_connection.query(Groups).filter(Groups.groupURL == group_url).first() # use first to avoid accessing as array

        # We do not care for duplicates
        item_exists = db_connection.query(Items).filter((Items.itemName == item_name),(Items.groupID == group_object.groupID)).first()
        
        if item_exists:
            response = {"error": "Item already exists"}
            db_connection.close()
            return response, 400
        
        else:
            item_object = Items(itemName = item_name, itemCost = item_cost, itemQuantity = item_quantity, groupID = group_object.groupID)
            db_connection.add(item_object)

            # update total cost and subtotal
            db_connection.query(Groups).filter(Groups.groupURL == group_url).update({
                "subTotal": group_object.subTotal + item_cost,
                "totalCost": (group_object.subTotal+item_cost)*(1.00875) + ((group_object.subTotal+item_cost) * group_object.tipRate/100)
            })
            db_connection.commit()
            db_connection.close()
            
            # returns message saying item created
            response = {"message": f"{item_name} successfully created"}
            return response, 200

    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400
    
    db_connection.close()
