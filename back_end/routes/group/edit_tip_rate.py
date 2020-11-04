from flask import Blueprint, request # create a blueprint for the routes to be registered to, not necessary but ood for modularization of routes
from models import create_db_connection, Groups # calling our helper function to create a connection to the databse to execute a request

# used to group a bunch of relted views together
# views in this case can count as code written to create various endpoints
bp = Blueprint('edit_tip_rate', __name__, url_prefix='/api')

@bp.route('/edit_tip_rate', methods=["PUT"])
def edit_tip_rate():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        tip_rate = data['tip_rate']
        group_url = data['group_url']

        # Get the group info
        user_session = db_connection.query(Groups).filter(Groups.groupURL == group_url).first()

        if tip_rate != user_session.tipRate:
            # NEED TO RECALCULATE PRICES AGAIN 
            
            db_connection.query(Groups).filter(Groups.groupID == user_session.groupID).update({
                "tipRate": (tip_rate),
                'totalCost': (user_session.subTotal * 1.08875) + (user_session.subTotal * tip_rate/100)
            })

            db_connection.commit()
            db_connection.close()
            
            response = {'message': 'Tip Rate updated'}
            return response, 200
        
        else:
            response = {'message': "Nothing to change"}
            return response, 400
        
    else:
        result = {'error': 'Connection to Database Failed'}
        return result, 400
        
    db_connection.close()
