from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required
)

from backend.models import db, Dog

dog_routes = Blueprint('dogs', __name__)


@dog_routes.route('', methods=['POST'])
def index():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    name = request.json.get('name', None)
    user_id = request.json.get('user_id', None)
    gender = request.json.get('gender', None)['value']
    birthday = request.json.get('birthday', None)
    print('birthday: ', birthday)
    if not name:
        return {"msg": "Please enter a name"}, 400
    if len(name) > 50:
        return {"msg": "Please abbreviate name to under 50 characters"}, 400
    if not user_id:
        return {"msg": "User not found"}, 400

    dog = Dog(name=name, user_id=user_id, gender=gender, birthday=birthday)

    db.session.add(dog)
    db.session.commit()

    return dog.to_dict(), 200