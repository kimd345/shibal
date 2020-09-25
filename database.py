from werkzeug.security import generate_password_hash
from dotenv import load_dotenv
from server import app, db
from server.models import User, Dog, Current_Dog, Post, Like

import requests

load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    demo_user = User(email='demo@user.com',
                     hashed_password=generate_password_hash('password'))
    test_user_2 = User(email='test_user_2@test.com',
                       hashed_password=generate_password_hash('password'))
    test_user_3 = User(email='test_user_3@test.com',
                       hashed_password=generate_password_hash('password'))
    test_user_4 = User(email='test_user_4@test.com',
                       hashed_password=generate_password_hash('password'))
    test_user_5 = User(email='test_user_5@test.com',
                       hashed_password=generate_password_hash('password'))
    test_user_6 = User(email='test_user_6@test.com',
                       hashed_password=generate_password_hash('password'))
    test_user_7 = User(email='test_user_7@test.com',
                       hashed_password=generate_password_hash('password'))
    test_user_8 = User(email='test_user_8@test.com',
                       hashed_password=generate_password_hash('password'))

    db.session.add(demo_user)
    db.session.add(test_user_2)
    db.session.add(test_user_3)
    db.session.add(test_user_4)
    db.session.add(test_user_5)
    db.session.add(test_user_6)
    db.session.add(test_user_7)
    db.session.add(test_user_8)

    demo_dog = Dog(user_id=1, name='만두', image_url="https://cdn.shibe.online/shibes/b8556c4cb61497d35c6d1790eef343dcf5430f09.jpg")  # noqa
    test_dog_2 = Dog(user_id=2, name='Walnut', image_url="https://cdn.shibe.online/shibes/1a92f81932d8e2976fbeadbd48ce03ea149dbe3d.jpg")  # noqa
    test_dog_3 = Dog(user_id=3, name='Lily', image_url="https://cdn.shibe.online/shibes/1501d925f913dd4cc85b57b193046e5cf3fb1e15.jpg")  # noqa
    test_dog_4 = Dog(user_id=4, name='ぎょうざ', image_url="https://cdn.shibe.online/shibes/f1979eb7fbd217318a5a72bba5aabbd7793610ef.jpg")  # noqa
    test_dog_5 = Dog(user_id=5, name='Pip', image_url="https://cdn.shibe.online/shibes/257876a12cd99b0995e958958a3dc79f1757ec76.jpg")  # noqa
    test_dog_6 = Dog(user_id=6, name='Rex', image_url="https://cdn.shibe.online/shibes/e4269bb5f9ce00274da89c947e1697896adae23c.jpg")  # noqa
    test_dog_7 = Dog(user_id=7, name='Joo', image_url="https://cdn.shibe.online/shibes/8c533aafeec84ba6c8450bce6c9c8a6c6002efb0.jpg")  # noqa
    test_dog_8 = Dog(user_id=8, name='Bogey', image_url="https://cdn.shibe.online/shibes/43c7f6caa02dc93f2b80a87272271261d2fe1848.jpg")  # noqa

    db.session.add(demo_dog)
    db.session.add(test_dog_2)
    db.session.add(test_dog_3)
    db.session.add(test_dog_4)
    db.session.add(test_dog_5)
    db.session.add(test_dog_6)
    db.session.add(test_dog_7)
    db.session.add(test_dog_8)
    db.session.commit()

    demo_current_dog = Current_Dog(user_id=1, dog_id=1)
    db.session.add(demo_current_dog)

    demo_post = Post(dog_id=1, image_url="https://cdn.shibe.online/shibes/a21b3d28beec5380ab9eb94b14348be0e67cfb92.jpg", body='안녕 얘들아!!')  # noqa
    test_post_2 = Post(dog_id=2, image_url="https://cdn.shibe.online/shibes/69901d07648a0ba1646b854c7b3114eb8cb7d5d2.jpg", body='hey hey hey')  # noqa
    test_post_3 = Post(dog_id=3, image_url="https://cdn.shibe.online/shibes/b68964180e052b787bf572e9de34031028fa3d67.jpg", body='im kinda sleepy')  # noqa
    test_post_4 = Post(dog_id=4, image_url="https://cdn.shibe.online/shibes/3f90d003d490dd99124c3230efbb198f85b83702.jpg", body='やぁ、何やってんの')  # noqa
    test_post_5 = Post(dog_id=5, image_url="https://cdn.shibe.online/shibes/faa241cee383ee408d1a93cc77b20a9a35c45ddf.jpg", body='u tryna front??')  # noqa
    test_post_6 = Post(dog_id=6, image_url="https://cdn.shibe.online/shibes/31b62b6a2710f865ea3ec7b87a054a7febcdf353.jpg", body='teeheehee')  # noqa
    test_post_7 = Post(dog_id=7, image_url="https://cdn.shibe.online/shibes/33d520a1e70ab3ec63d2a5aeee28ab9dad4958ce.jpg", body='where are we..?')  # noqa
    test_post_8 = Post(dog_id=8, image_url="https://cdn.shibe.online/shibes/4149cbc36f4b95601d576cbabb0c7a1e716c0ce1.jpg", body='I am a happy Inu!')  # noqa

    db.session.add(demo_post)
    db.session.add(test_post_2)
    db.session.add(test_post_3)
    db.session.add(test_post_4)
    db.session.add(test_post_5)
    db.session.add(test_post_6)
    db.session.add(test_post_7)
    db.session.add(test_post_8)

    demo_like = Like(dog_id=1, post_id=1)
    demo_like_2 = Like(dog_id=1, post_id=2)

    db.session.add(demo_like)
    db.session.add(demo_like_2)

    db.session.commit()
