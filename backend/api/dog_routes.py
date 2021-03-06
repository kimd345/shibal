from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required
)

from backend.models import db, Dog

dog_routes = Blueprint('dogs', __name__)


@dog_routes.route('', methods=['POST'])
def createDog():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    name = request.json.get('name', None)
    user_id = request.json.get('userId', None)
    gender = request.json.get('gender', None)
    birthday = request.json.get('birthday', None)
    image_url = request.json.get('imageUrl', None)

    if gender:
        gender = gender['value']

    if not name:
        return {"msg": "Please enter a name"}, 400
    if len(name) > 50:
        return {"msg": "Please abbreviate name to under 50 characters"}, 400
    if not user_id:
        return {"msg": "User not found"}, 400

    dog = Dog(name=name, user_id=user_id, gender=gender, birthday=birthday, image_url=image_url)  # noqa

    db.session.add(dog)
    db.session.commit()

    return dog.to_dict(), 200


@dog_routes.route('/<dogId>', methods=['DELETE'])
def deleteDog(dogId):
    dog = Dog.query.filter(Dog.id == dogId).first()
    db.session.delete(dog)
    db.session.commit()
    return jsonify({"msg": "Delete successful"}), 200


@dog_routes.route('/<dogId>', methods=['GET'])
def getDog(dogId):
    dog = Dog.query.filter(Dog.id == dogId).first()
    return dog.to_dict(), 200


@dog_routes.route('/user-id/<userId>', methods=['GET'])
def getDogs(userId):
    dogs = Dog.query.filter(Dog.user_id == userId)
    return {'dogs': [dog.to_dict() for dog in dogs]}, 200
