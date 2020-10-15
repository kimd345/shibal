import os
from flask import Flask, render_template, request, session
from flask_login import LoginManager
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_jwt_extended import JWTManager


from backend.models import db, User
from backend.api.auth_routes import auth_routes
from backend.api.user_routes import user_routes
from backend.api.dog_routes import dog_routes
from backend.api.post_routes import post_routes
from backend.api.like_routes import like_routes

from backend.config import Config

app = Flask(__name__, static_url_path='')

jwt = JWTManager(app)

app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(dog_routes, url_prefix='/api/dogs')
app.register_blueprint(post_routes, url_prefix='/api/posts')
app.register_blueprint(like_routes, url_prefix='/api/likes')
db.init_app(app)

# Application Security
CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get('FLASK_ENV') else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def react_root(path):
    return None
