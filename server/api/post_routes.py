from flask import Blueprint, jsonify, request
from server.models import Post

post_routes = Blueprint('post', __name__)


@post_routes.route('')
def index():
    response = Post.query.limit(200)
    return {'posts': [post.to_dict() for post in response]}
