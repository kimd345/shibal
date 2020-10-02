from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required
)

from backend.models import db, User, Current_Dog

user_routes = Blueprint('users', __name__)


@user_routes.route('/current-dog', methods=['PUT'])
def updateCurrentDog():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    user_id = request.json.get('userId', None)
    dog_id = request.json.get('dogId', None)
    if not user_id:
        return {"msg": "User not found"}, 400
    if not dog_id:
        return {"msg": "Dog not found"}, 400

    current_dog = Current_Dog.query.filter(Current_Dog.user_id == user_id).first()   # noqa
    if current_dog:
        db.session.delete(current_dog)
        db.session.commit()

    current_dog = Current_Dog(user_id=user_id, dog_id=dog_id)
    db.session.add(current_dog)
    db.session.commit()

    return current_dog.to_dict(), 200
