import requests
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv
from backend import app, db
from backend.models import (User, Dog, Current_Dog, Post, Like,
                            Program, Module, Lesson, Quiz, Enrollment)


load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    demo_user = User(email='demo@user.com',
                     hashed_password=generate_password_hash('password'))
    dogs_user = User(email='dogs@user.com',
                     hashed_password=generate_password_hash('password'))

    db.session.add(demo_user)
    db.session.add(dogs_user)

    demo_dog = Dog(user_id=1, name='만두', image_url="https://cdn.shibe.online/shibes/b8556c4cb61497d35c6d1790eef343dcf5430f09.jpg")  # noqa
    test_dog_2 = Dog(user_id=2, name='Walnut', image_url="https://cdn.shibe.online/shibes/1a92f81932d8e2976fbeadbd48ce03ea149dbe3d.jpg")  # noqa
    test_dog_3 = Dog(user_id=2, name='ぎょうざ', image_url="https://cdn.shibe.online/shibes/f1979eb7fbd217318a5a72bba5aabbd7793610ef.jpg")  # noqa

    db.session.add(demo_dog)
    db.session.add(test_dog_2)
    db.session.add(test_dog_3)

    db.session.commit()

    demo_current_dog = Current_Dog(user_id=1, dog_id=1)
    test_current_dog = Current_Dog(user_id=2, dog_id=2)

    db.session.add(demo_current_dog)
    db.session.add(test_current_dog)

    demo_post = Post(dog_id=1, image_url="https://cdn.shibe.online/shibes/a21b3d28beec5380ab9eb94b14348be0e67cfb92.jpg", body='안녕 얘들아!!')  # noqa
    test_post_2 = Post(dog_id=2, image_url="https://cdn.shibe.online/shibes/69901d07648a0ba1646b854c7b3114eb8cb7d5d2.jpg", body='hey hey hey')  # noqa
    test_post_3 = Post(dog_id=2, image_url="https://cdn.shibe.online/shibes/3f90d003d490dd99124c3230efbb198f85b83702.jpg", body='やぁ、何やってんの')  # noqa

    db.session.add(demo_post)
    db.session.add(test_post_2)
    db.session.add(test_post_3)

    demo_like = Like(dog_id=1, post_id=1)
    demo_like_2 = Like(dog_id=1, post_id=2)

    db.session.add(demo_like)
    db.session.add(demo_like_2)

    db.session.commit()

    # Programs
    new_dog = Program(title='New Dog', description='Teach your puppy the love of learning and spending time with you. Training will prevent future behavior problems like eliminating in the wrong places, guarding behavior, biting, etc. Having a trained puppy is a recipe for a happy friendship.')  # noqa
    db.session.add(new_dog)
    db.session.commit()

    # Modules
    new_dog_module_1 = Module(program_id=1, title='Module 1 - Teach your puppy to pay attention to you')  # noqa
    db.session.add(new_dog_module_1)
    db.session.commit()

    # Lessons
    new_dog_module_1_lesson_1 = Lesson(module_id=2, title='Lesson 1 - Handfeeding, Potty training')  # noqa
    new_dog_module_1_lesson_2 = Lesson(module_id=2, title='Lesson 2 - Clicker, Handling, Tug')  # noqa
    new_dog_module_1_lesson_3 = Lesson(module_id=2, title='Lesson 3 - Crate I, Name')  # noqa
    new_dog_module_1_lesson_4 = Lesson(module_id=2, title='Lesson 4 - Meet and greet, Name in a circle')  # noqa
    new_dog_module_1_lesson_5 = Lesson(module_id=2, title='Lesson 5 - Bite inhibition, Put a collar on your dog')  # noqa
    new_dog_module_1_lesson_6 = Lesson(module_id=2, title='Lesson 6 - Crate II')  # noqa
    new_dog_module_1_lesson_7 = Lesson(module_id=2, title='Lesson 7 - Revision')  # noqa

    db.session.add(new_dog_module_1_lesson_1)
    db.session.commit()
