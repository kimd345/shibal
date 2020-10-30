import requests
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv
from backend import app, db
from backend.models import (User, Dog, Current_Dog, Post, Like,
                            Program, Module, Lesson, Quiz,
                            Training, Skill, Activity, Enrollment)


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

    # Module 1
    _2_new_dog_module_1 = Module(program_id=1, title='Module 1 - Teach your puppy to pay attention to you')  # noqa
    db.session.add(_2_new_dog_module_1)
    db.session.commit()

    _3_new_dog_module_1_lesson_1 = Lesson(module_id=2, title='Lesson 1 - Handfeeding, Potty training')  # noqa
    db.session.add(_3_new_dog_module_1_lesson_1)
    db.session.commit()

    _4_new_dog_module_1_lesson_1_quiz = Quiz(lesson_id=3, prompt='In the first week many new dog parents will hear their puppy crying at night. How should you react when you hear your puppy cry?', questions=["Take the puppy to your arms. You want to create a safe space and bond.", "Tell your puppy to \"hush\" and shake lightly by the scruff, as dog mum.", "Make sure your dog doesn\'t need to pee. Otherwise, ignore the puppy."], answer_idx=2, explanation='New home, no siblings, it is normal that your puppy will feel lonely and insecure at night. But, you should think about what your reaction will teach them. Whining = sleeping in the bed. If you don\'t want your dog to sleep in your bed in the future, put earplugs in and ignore your puppy. They will calm down.')  # noqa
    db.session.add(_4_new_dog_module_1_lesson_1_quiz)
    db.session.commit()

    _5_new_dog_module_1_lesson_1_training = Training(lesson_id=3, description='Master a familiar trick or learn a new exercise. Repeat the exercise while the timer is running.')  # noqa
    db.session.add(_5_new_dog_module_1_lesson_1_training)
    db.session.commit()

    _6_new_dog_module_1_lesson_1_training_skill_1 = Skill(training_id=5, title='Hand Feeding', steps=["After this exercise, your dog will pay more attention to you and your hands. Get your dog\'s attention and show super tasty food in your hand.", "Feed your dog while walking backwards. Your dog follows you and eats from your hand."])  # noqa
    db.session.add(_6_new_dog_module_1_lesson_1_training_skill_1)
    db.session.commit()

    _7_new_dog_module_1_lesson_1_training_skill_2 = Skill(training_id=5, title='Potty Training', steps=["To be successful in potty training it is important to have a consistent schedule. Take your puppy to their designated potty area 15 to 30 minutes after feeding time, or immediately after they wake up.", "If your dog cannot be taken outside then the spot should be as close to the doors; placing a sponge soaked in urine might help your puppy find the correct place.", "Once you are outside, concentrate on the mission. Keep your dog on a short lead, allow sniffing, but do not play until they are done.", "After your pet has been eliminated, praise enthusiastically and reward with time outside to explore, or have playtime.", "Set reminders to take your puppy outside. A puppy of 1 month can hold it for 1 hour, 2 months - 2 hours, etc. Your dog should not be left alone for longer than six hours without a potty break."])  # noqa
    db.session.add(_7_new_dog_module_1_lesson_1_training_skill_2)
    db.session.commit()

    _8_new_dog_module_1_lesson_1_training_activity = Activity(lesson_id=3, description='Spend some time with your dog and complete these tasks during the day', tasks=["Introduce your puppy to two family members. They should greet the dog by getting down low to puppy's level and pet them gently."])  # noqa
    db.session.add(_8_new_dog_module_1_lesson_1_training_activity)
    db.session.commit()
