from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required
)

from backend.models import db, Like

like_routes = Blueprint('likes', __name__)


@like_routes.route('', methods=['POST'])
def createLike():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    dog_id = request.json.get('dogId', None)
    post_id = request.json.get('postId', None)

    if not dog_id:
        return {"msg": "Dog not found"}, 400
    if not post_id:
        return {"msg": "Post not found"}, 400

    like = Like(dog_id=dog_id, post_id=post_id)  # noqa

    db.session.add(like)
    db.session.commit()

    return like.to_dict(), 200


@like_routes.route('/<dogId>/<postId>', methods=['DELETE'])
def deleteLike(dogId, postId):
    like = Like.query.filter(Like.dog_id == dogId, Like.post_id == postId).first()  # noqa
    db.session.delete(like)
    db.session.commit()
    return like.to_dict(), 200


@like_routes.route('', methods=['GET'])
# @jwt_required
def getLikes():
    response = Like.query.all()
    return {'likes': [like.to_dict() for like in response]}
