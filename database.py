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

    # NEW DOG
    # Program
    _1_new_dog = Program(title='New Dog', description='Teach your puppy the love of learning and spending time with you. Training will prevent future behavior problems like eliminating in the wrong places, guarding behavior, biting, etc. Having a trained puppy is a recipe for a happy friendship.')  # noqa
    db.session.add(_1_new_dog)
    db.session.commit()

    # Modules
    _2_new_dog_module_1 = Module(program_id=1, title='Module 1 - Teach your puppy to pay attention to you')  # noqa
    _3_new_dog_module_2 = Module(program_id=1, title='Module 2 - Teach basic commands')  # noqa
    _4_new_dog_module_3 = Module(program_id=1, title='Module 3 - Teach your puppy impulse control')  # noqa
    _5_new_dog_module_4 = Module(program_id=1, title='Module 4 - Improve your dog\'s concentration')  # noqa

    db.session.add(_2_new_dog_module_1)
    db.session.add(_3_new_dog_module_2)
    db.session.add(_4_new_dog_module_3)
    db.session.add(_5_new_dog_module_4)
    db.session.commit()

    # Lessons
    # Module 1
    _6_new_dog_module_1_lesson_1 = Lesson(module_id=2, title='Lesson 1 - Handfeeding, Potty training')  # noqa
    _7_new_dog_module_1_lesson_2 = Lesson(module_id=2, title='Lesson 2 - Clicker, Handling, Tug')  # noqa
    _8_new_dog_module_1_lesson_3 = Lesson(module_id=2, title='Lesson 3 - Crate I, Name')  # noqa
    _9_new_dog_module_1_lesson_4 = Lesson(module_id=2, title='Lesson 4 - Meet and greet, Name in a circle')  # noqa
    _10_new_dog_module_1_lesson_5 = Lesson(module_id=2, title='Lesson 5 - Bite inhibition, Put a collar on your dog')  # noqa
    _11_new_dog_module_1_lesson_6 = Lesson(module_id=2, title='Lesson 6 - Crate II')  # noqa
    _12_new_dog_module_1_lesson_7 = Lesson(module_id=2, title='Lesson 7 - Revision')  # noqa

    # Module 2
    _13_new_dog_module_2_lesson_1 = Lesson(module_id=3, title='Lesson 1 - Resource guarding, Name II')  # noqa
    _14_new_dog_module_2_lesson_2 = Lesson(module_id=3, title='Lesson 2 - Crate III, Search')  # noqa
    _15_new_dog_module_2_lesson_3 = Lesson(module_id=3, title='Lesson 3 - Handling II, Sit')  # noqa
    _16_new_dog_module_2_lesson_4 = Lesson(module_id=3, title='Lesson 4 - Come, Down')  # noqa
    _17_new_dog_module_2_lesson_5 = Lesson(module_id=3, title='Lesson 5 - Sit II')  # noqa
    _18_new_dog_module_2_lesson_6 = Lesson(module_id=3, title='Lesson 6 - Down II, Put on a leash')  # noqa
    _19_new_dog_module_2_lesson_7 = Lesson(module_id=3, title='Lesson 7 - Revision')  # noqa

    # Module 3
    _20_new_dog_module_3_lesson_1 = Lesson(module_id=4, title='Lesson 1 - Walking on a leash')  # noqa
    _21_new_dog_module_3_lesson_2 = Lesson(module_id=4, title='Lesson 2 - Come with distraction, Handling III')  # noqa
    _22_new_dog_module_3_lesson_3 = Lesson(module_id=4, title='Lesson 3 - Give back, Take it')  # noqa
    _23_new_dog_module_3_lesson_4 = Lesson(module_id=4, title='Lesson 4 - Resource guarding II')  # noqa
    _24_new_dog_module_3_lesson_5 = Lesson(module_id=4, title='Lesson 5 - Gotcha!, Prevent jumping')  # noqa
    _25_new_dog_module_3_lesson_6 = Lesson(module_id=4, title='Lesson 6 - Walking on a leash II')  # noqa
    _26_new_dog_module_3_lesson_7 = Lesson(module_id=4, title='Lesson 7 - Revision')  # noqa

    # Module 4
    _27_new_dog_module_4_lesson_1 = Lesson(module_id=5, title='Lesson 1 - Closed fist, Sit & Stay')  # noqa
    _28_new_dog_module_4_lesson_2 = Lesson(module_id=5, title='Lesson 2 - Settle down, Take it II')  # noqa
    _29_new_dog_module_4_lesson_3 = Lesson(module_id=5, title='Lesson 3 - Closed first II')  # noqa
    _30_new_dog_module_4_lesson_4 = Lesson(module_id=5, title='Lesson 4 - Search II, Sit & stay II')  # noqa
    _31_new_dog_module_4_lesson_5 = Lesson(module_id=5, title='Lesson 5 - Give back II')  # noqa
    _32_new_dog_module_4_lesson_6 = Lesson(module_id=5, title='Lesson 6 - Come and release, Moving objects')  # noqa
    _33_new_dog_module_4_lesson_7 = Lesson(module_id=5, title='Lesson 7 - Revision')  # noqa

    db.session.add(_6_new_dog_module_1_lesson_1)
    db.session.add(_7_new_dog_module_1_lesson_2)
    db.session.add(_8_new_dog_module_1_lesson_3)
    db.session.add(_9_new_dog_module_1_lesson_4)
    db.session.add(_10_new_dog_module_1_lesson_5)
    db.session.add(_11_new_dog_module_1_lesson_6)
    db.session.add(_12_new_dog_module_1_lesson_7)

    db.session.add(_13_new_dog_module_2_lesson_1)
    db.session.add(_14_new_dog_module_2_lesson_2)
    db.session.add(_15_new_dog_module_2_lesson_3)
    db.session.add(_16_new_dog_module_2_lesson_4)
    db.session.add(_17_new_dog_module_2_lesson_5)
    db.session.add(_18_new_dog_module_2_lesson_6)
    db.session.add(_19_new_dog_module_2_lesson_7)

    db.session.add(_20_new_dog_module_3_lesson_1)
    db.session.add(_21_new_dog_module_3_lesson_2)
    db.session.add(_22_new_dog_module_3_lesson_3)
    db.session.add(_23_new_dog_module_3_lesson_4)
    db.session.add(_24_new_dog_module_3_lesson_5)
    db.session.add(_25_new_dog_module_3_lesson_6)
    db.session.add(_26_new_dog_module_3_lesson_7)

    db.session.add(_27_new_dog_module_4_lesson_1)
    db.session.add(_28_new_dog_module_4_lesson_2)
    db.session.add(_29_new_dog_module_4_lesson_3)
    db.session.add(_30_new_dog_module_4_lesson_4)
    db.session.add(_31_new_dog_module_4_lesson_5)
    db.session.add(_32_new_dog_module_4_lesson_6)
    db.session.add(_33_new_dog_module_4_lesson_7)

    db.session.commit()

    # Quizzes
    # Module 1 Lesson 1
