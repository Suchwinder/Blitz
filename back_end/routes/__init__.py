from flask import Blueprint, request # create a blueprint for the routes to be registered to, not necessary but ood for modularization of routes
from back_end.models import create_db_connection # calling our helper function to create a connection to the databse to execute a request

## used to group a bunch of relted views together
## views in this case can count as code written to create various endpoints
bp = Blueprint('blitz', __name__, url_prefix='/api')

@bp.route('/create', methods=("POST")
def create_group():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

        users = data.names
        street_address = data.streetAddress
        state = data.state
        city = data.city
        location_name = data.locationName

    else:
        result = {'error': 'Connection to Dataabse Failed'}
        return result, 400
