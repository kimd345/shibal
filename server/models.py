import datetime
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(320), nullable=False, unique=True)
    hashed_password = db.Column(db.String(100), nullable=False)
    session_token = db.Column(db.String(500))

    dogs = db.relationship('Dog', backref='user', lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'session_token': self.session_token,
            'dogs': self.dogs
        }


class Dog(db.Model):
    __tablename__ = 'dogs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(2048))
    birthday = db.Column(db.Date)
    gender = db.Column(db.String(50))

    likes = db.relationship('Like', backref='dog', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'profile_image_url': self.image_url,
            'birthday': self.birthday,
            'gender': self.gender
            # 'likes': self.likes
        }


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))
    image_url = db.Column(db.String(2048))
    body = db.Column(db.String(280))
    created_at = db.Column(db.DateTime, default=datetime.datetime.now)

    likes = db.relationship('Like', backref='post', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'dogId': self.dog_id,
            'postImageUrl': self.image_url,
            'body': self.body,
            'createdAt': self.created_at
            # 'likes': self.likes
        }


class Like(db.Model):
    __tablename__ = 'likes'

    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'), primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(
        'posts.id'), primary_key=True)
