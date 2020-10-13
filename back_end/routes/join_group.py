from flask import Blueprint, request # create a blueprint for the routes to be registered to, not necessary but ood for modularization of routes
from back_end.models import create_db_connection # calling our helper function to create a connection to the databse to execute a request

bp = Blueprint('join_group', __name__, url_prefix='/api')

@bp.route('/join', methods=("GET")
def join_group():
    db_connection = create_db_connection()
    if db_connection:
        data = request.get_json()

    else:
        result = {'error': 'Connection to Dataabse Failed'}
        return result, 400
