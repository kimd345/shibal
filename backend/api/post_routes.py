from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from backend.models import db, Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('', methods=['GET'])
# @jwt_required
def getPosts():
    response = Post.query.order_by(Post.created_at.desc()).limit(200)
    return {'posts': [post.to_dict() for post in response]}


@post_routes.route('', methods=['POST'])
def createPost():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    dog_id = request.json.get('dogId', None)
    image_url = request.json.get('imageUrl', None)
    body = request.json.get('body', None)

    if not dog_id:
        return {"msg": "Dog not found"}, 400
    if not image_url:
        return {"msg": "Please upload a photo"}, 400

    post = Post(dog_id=dog_id, image_url=image_url, body=body)

    db.session.add(post)
    db.session.commit()

    return post.to_dict(), 200


@post_routes.route('/<postId>', methods=['DELETE'])
def deletePost(postId):
    post = Post.query.filter(Post.id == postId).first()
    db.session.delete(post)
    db.session.commit()
    return jsonify({"msg": "Delete successful"}), 200
