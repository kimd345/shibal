from flask import Blueprint, jsonify, request
from backend.models import Post
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

post_routes = Blueprint('posts', __name__)


@post_routes.route('')
# @jwt_required
def getPosts():
    response = Post.query.limit(200)
    return {'posts': [post.to_dict() for post in response]}
