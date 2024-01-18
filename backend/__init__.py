"""
This module initializes the Flask application and its extensions.

It imports necessary modules and packages, sets up the application's configurations, 
registers the application's blueprints, and initializes the database.

It also sets up JWT (JSON Web Token) for the application, applies CORS
(Cross-Origin Resource Sharing) policy, and defines a couple of routes.

Functions:
    inject_csrf_token(response): Sets a CSRF (Cross-Site Request Forgery) token
    in the response cookie.
    react_root(path): A placeholder function for a route.

Imports:
    os: Provides a way of using operating system dependent functionality.
    flask: A micro web framework written in Python.
    flask_login: Provides user session management for Flask.
    flask_cors: A Flask extension for handling Cross Origin Resource Sharing (CORS),
    making cross-origin AJAX possible.
    flask_wtf.csrf: Provides CSRF protection for Flask.
    flask_jwt_extended: An extension that provides JWT support to Flask application.
    backend.models: Imports the database and User model.
    backend.api.*_routes: Imports the routes for the application.
    backend.config: Imports the configuration for the application.

Variables:
    app: The Flask application instance.
    jwt: The JWT manager instance.
"""

import os
from flask import Flask, render_template, request, session
from flask_login import LoginManager
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate


from backend.models import db, User
from backend.api.auth_routes import auth_routes
from backend.api.user_routes import user_routes
from backend.api.dog_routes import dog_routes
from backend.api.post_routes import post_routes
from backend.api.like_routes import like_routes
from backend.api.training_routes import training_routes

from backend.config import Config

app = Flask(__name__, static_url_path='')

jwt = JWTManager(app)

app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(dog_routes, url_prefix='/api/dogs')
app.register_blueprint(post_routes, url_prefix='/api/posts')
app.register_blueprint(like_routes, url_prefix='/api/likes')
app.register_blueprint(training_routes, url_prefix='/api/trainings')
db.init_app(app)
migrate = Migrate(app, db)

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
