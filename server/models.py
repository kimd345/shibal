import datetime
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

post_likes = db.Table('likes',
                      db.Column('dog_id', db.Integer, db.ForeignKey(
                          'dogs.id'), primary_key=True),
                      db.Column('post_id', db.Integer, db.ForeignKey(
                          'posts.id'), primary_key=True)
                      )


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
            "id": self.id,
            "email": self.email,
        }


class Dog(db.Model):
    __tablename__ = 'dogs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(2048))
    birthday = db.Column(db.Date)
    gender = db.Column(db.String(50))
    posts = db.relationship('Post', backref='dog', lazy=True)
    likes = db.relationship('Post', secondary=post_likes, lazy='subquery',
                            backref=db.backref('dogs', lazy=True))


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'))
    image_url = db.Column(db.String(2048))
    body = db.Column(db.String(280))
    created_at = db.Column(db.DateTime, default=datetime.datetime.now)
