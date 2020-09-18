import os
from flask import Flask, render_template, request, session
from flask_login import LoginManager
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_jwt_extended import JWTManager


from server.models import db, User
from server.api.auth_routes import auth_routes
from server.api.user_routes import user_routes

from server.config import Config

app = Flask(__name__, static_url_path='')

jwt = JWTManager(app)

app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(user_routes, url_prefix='/api/users')
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
    return app.send_static_file('index.html')
