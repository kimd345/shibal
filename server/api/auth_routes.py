from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    # jwt_required, #Protect a view with jwt_required, which requires
    # a valid access token in the request to access.
    # get_jwt_identity, #Access the identity of the current user with it
)

from server.models import db, User

auth_routes = Blueprint('auth_routes', __name__)


@auth_routes.route('', methods=['PUT', 'POST', 'DELETE'])
def auth():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    if request.method == 'DELETE':  # logout
        id = request.json.get('userId', None)
        user = User.query.filter(User.id == id).first()
        user.session_token = None
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg": "Session token removed"}), 200

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email:
        return jsonify({"msg": "Missing email"}), 400
    if not password:
        return jsonify({"msg": "Missing password"}), 400

    if request.method == 'PUT':   # login
        user = User.query.filter(User.email == email).first()
        if not user or not user.check_password(password):
            return jsonify({"msg": "Missing password"}), 401
    elif request.method == 'POST':  # signup
        user = User(username=username, email=email)
        user.password = password

    access_token = create_access_token(identity=email)
    user.session_token = access_token
    db.session.add(user)
    db.session.commit()

    return jsonify({'user': user.to_dict}), 200
