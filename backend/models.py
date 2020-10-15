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
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

    dogs = db.relationship('Dog', backref='user', cascade='save-update, merge, delete, delete-orphan', lazy=True)  # noqa
    current_dog = db.relationship('Current_Dog', backref='user', cascade='save-update, merge, delete, delete-orphan', lazy=True)  # noqa

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
            'currentDogId': [dog.to_id() for dog in self.current_dog],
            'email': self.email,
            'createdAt': self.created_at
        }


class Dog(db.Model):
    __tablename__ = 'dogs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))  # noqa
    name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(8192), default='https://shibal-bucket10155-dev.s3.amazonaws.com/assets/shiba_default_head.png')  # noqa
    birthday = db.Column(db.Date)
    gender = db.Column(db.String(50))

    likes = db.relationship('Like', backref='dog', cascade='save-update, merge, delete, delete-orphan', lazy=True)  # noqa

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'profileImageUrl': self.image_url,
            'birthday': self.birthday,
            'gender': self.gender
        }

    def to_id(self):
        return self.id


class Current_Dog(db.Model):
    __tablename__ = 'current_dogs'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)  # noqa
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id', ondelete='CASCADE'), primary_key=True)  # noqa

    def to_dict(self):
        return {
            'userId': self.user_id,
            'dogId': self.dog_id
        }

    def to_id(self):
        return self.dog_id


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id', ondelete='CASCADE'))  # noqa
    image_url = db.Column(db.String(8192), nullable=False)
    body = db.Column(db.String(280))
    created_at = db.Column(db.DateTime, default=datetime.datetime.now)

    dog = db.relationship('Dog', backref='post', lazy=True)  # noqa
    likes = db.relationship('Like', backref='post', cascade='save-update, merge, delete, delete-orphan', lazy=True)  # noqa

    def to_dict(self):
        return {
            'id': self.id,
            'dogId': self.dog_id,
            'postImageUrl': self.image_url,
            'body': self.body,
            'createdAt': self.created_at,
            'dog': self.dog.to_dict(),
            'likes': [like.to_dict() for like in self.likes]
        }


class Like(db.Model):
    __tablename__ = 'likes'

    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id', ondelete='CASCADE'), primary_key=True)  # noqa
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id', ondelete='CASCADE'), primary_key=True)  # noqa

    def to_dict(self):
        return {
            'dogId': self.dog_id,
            'postId': self.post_id
        }
