import datetime
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()
entity_id_seq = db.Sequence('entity_id_seq')

skills = db.Table('lessons_skills',
                  db.Column('lesson_id', db.Integer, db.ForeignKey(
                      'lessons.id'), primary_key=True),
                  db.Column('skill_id', db.Integer, db.ForeignKey(
                      'skills.id'), primary_key=True)
                  )


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(320), nullable=False, unique=True)
    hashed_password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

    # cascade delete dogs orphans when deleting user
    dogs = db.relationship('Dog', cascade='save-update, merge, delete, delete-orphan')  # noqa
    # cascade delete current_dog orphan when deleting user, or dog
    current_dog = db.relationship('Current_Dog', backref='user', cascade='save-update, merge, delete, delete-orphan')  # noqa

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

    likes = db.relationship('Like', backref='dog', cascade='save-update, merge, delete, delete-orphan')  # noqa
    posts = db.relationship('Post', cascade='save-update, merge, delete, delete-orphan')  # noqa

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

    dog = db.relationship('Dog')  # noqa
    # cascade delete children likes orphans on delete post
    likes = db.relationship('Like', cascade='save-update, merge, delete, delete-orphan')  # noqa

    def to_dict(self):
        return {
            'id': self.id,
            'dogId': self.dog_id,
            'postImageUrl': self.image_url,
            'body': self.body,
            'createdAt': self.created_at,
            'dog': self.dog.to_dict(),
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


# Training
class Program(db.Model):
    __tablename__ = 'programs'

    id = db.Column(db.Integer, entity_id_seq, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)

    modules = db.relationship('Module', backref='program')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'modules': [module.to_dict() for module in self.modules]
        }


class Module(db.Model):
    __tablename__ = 'modules'

    id = db.Column(db.Integer, entity_id_seq, primary_key=True)
    program_id = db.Column(db.Integer, db.ForeignKey('programs.id'))  # noqa
    title = db.Column(db.String(100), nullable=False)

    lessons = db.relationship('Lesson', backref='module')

    def to_dict(self):
        return {
            'id': self.id,
            'program_id': self.program_id,
            'title': self.title,
            'lessons': [lesson.to_dict() for lesson in self.lessons]
        }


class Lesson(db.Model):
    __tablename__ = 'lessons'

    id = db.Column(db.Integer, entity_id_seq, primary_key=True)
    module_id = db.Column(db.Integer, db.ForeignKey('modules.id'))
    title = db.Column(db.String(100), nullable=False)

    quizzes = db.relationship('Quiz', backref='lesson')
    activities = db.relationship('Activity', backref='lesson')

    skills = db.relationship('Skill', secondary=skills, lazy='subquery',
                             backref=db.backref('lessons', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'module_id': self.module_id,
            'title': self.title,
            'quizzes': [quiz.to_dict() for quiz in self.quizzes],
            'skills': [skill.to_dict() for skill in self.skills],
            'activities': [activity.to_dict() for activity in self.activities]
        }


class Quiz(db.Model):
    __tablename__ = 'quizzes'

    id = db.Column(db.Integer, entity_id_seq, primary_key=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'))
    prompt = db.Column(db.String(500), nullable=False)
    questions = db.Column(db.ARRAY(db.String(2000)), nullable=False)
    answer_idx = db.Column(db.Integer, nullable=False)
    explanation = db.Column(db.String(500), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'lesson_id': self.lesson_id,
            'prompt': self.prompt,
            'questions': self.questions,
            'answer_idx': self.answer_idx,
            'explanation': self.explanation
        }


class Skill(db.Model):
    __tablename__ = 'skills'

    id = db.Column(db.Integer, entity_id_seq, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    steps = db.Column(db.ARRAY(db.String(5000)), nullable=False)
    duration = db.Column(db.Integer, default=120)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'steps': self.steps,
            'duration': self.duration
        }


class Activity(db.Model):
    __tablename__ = 'activities'

    id = db.Column(db.Integer, entity_id_seq, primary_key=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'))
    description = db.Column(db.String(500), nullable=False)
    tasks = db.Column(db.ARRAY(db.String(2000)), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'lesson_id': self.lesson_id,
            'description': self.description,
            'tasks': self.tasks
        }


class Enrollment(db.Model):
    __tablename__ = 'enrollments'

    entity_id = db.Column(db.Integer, db.ForeignKey('programs.id'),
                          db.ForeignKey('modules.id'),
                          db.ForeignKey('lessons.id'),
                          db.ForeignKey('quizzes.id'),
                          db.ForeignKey('skills.id'),
                          db.ForeignKey('activities.id'),
                          primary_key=True)
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs.id'), primary_key=True)
    entity_type = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(11), default='In Progress')
