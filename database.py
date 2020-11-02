import requests
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv
from backend import app, db
from backend.models import (User, Dog, Current_Dog, Post, Like,
                            Program, Module, Lesson, Quiz,
                            skills, Skill, Activity, Enrollment)


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
    # Lesson 1
    _2_new_dog_module_1 = Module(program_id=1, title='Module 1 - Teach your puppy to pay attention to you')  # noqa
    db.session.add(_2_new_dog_module_1)
    db.session.commit()

    _3_new_dog_module_1_lesson_1 = Lesson(module_id=2, title='Lesson 1 - Handfeeding, Potty training')  # noqa
    db.session.add(_3_new_dog_module_1_lesson_1)
    db.session.commit()

    _4_new_dog_module_1_lesson_1_quiz = Quiz(lesson_id=3, prompt='In the first week many new dog parents will hear their puppy crying at night. How should you react when you hear your puppy cry?', questions=["Take the puppy to your arms. You want to create a safe space and bond.", "Tell your puppy to \"hush\" and shake lightly by the scruff, as dog mum.", "Make sure your dog doesn\'t need to pee. Otherwise, ignore the puppy."], answer_idx=2, explanation='New home, no siblings, it is normal that your puppy will feel lonely and insecure at night. But, you should think about what your reaction will teach them. Whining = sleeping in the bed. If you don\'t want your dog to sleep in your bed in the future, put earplugs in and ignore your puppy. They will calm down.')  # noqa
    db.session.add(_4_new_dog_module_1_lesson_1_quiz)
    db.session.commit()

    _5_new_dog_module_1_lesson_1_training_skill_1 = Skill(title='Hand Feeding', steps=["After this exercise, your dog will pay more attention to you and your hands. Get your dog\'s attention and show super tasty food in your hand.", "Feed your dog while walking backwards. Your dog follows you and eats from your hand."])  # noqa
    db.session.add(_5_new_dog_module_1_lesson_1_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=3, skill_id=5))

    _6_new_dog_module_1_lesson_1_training_skill_2 = Skill(title='Potty Training', steps=["To be successful in potty training it is important to have a consistent schedule. Take your puppy to their designated potty area 15 to 30 minutes after feeding time, or immediately after they wake up.", "If your dog cannot be taken outside then the spot should be as close to the doors; placing a sponge soaked in urine might help your puppy find the correct place.", "Once you are outside, concentrate on the mission. Keep your dog on a short lead, allow sniffing, but do not play until they are done.", "After your pet has been eliminated, praise enthusiastically and reward with time outside to explore, or have playtime.", "Set reminders to take your puppy outside. A puppy of 1 month can hold it for 1 hour, 2 months - 2 hours, etc. Your dog should not be left alone for longer than six hours without a potty break."])  # noqa
    db.session.add(_6_new_dog_module_1_lesson_1_training_skill_2)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=3, skill_id=6))

    _7_new_dog_module_1_lesson_1_training_activity = Activity(lesson_id=3, tasks=["Introduce your puppy to two family members. They should greet the dog by getting down low to puppy's level and pet them gently."])  # noqa
    db.session.add(_7_new_dog_module_1_lesson_1_training_activity)
    db.session.commit()

    # Lesson 2
    _8_new_dog_module_1_lesson_2 = Lesson(module_id=2, title='Lesson 2 - Whistle, Handling, Tug')  # noqa
    db.session.add(_8_new_dog_module_1_lesson_2)
    db.session.commit()

    _9_new_dog_module_1_lesson_2_quiz = Quiz(lesson_id=8, prompt='If your dog is trained to go to the toilet at home...', questions=["The designated spot should be near the bed.", "Rugs and newspapers are good for training.", "The spot should be in a quiet place."], answer_idx=2, explanation='Teaching your dog to eliminate on puppy pads, on paper, or in a litter box can make housebreaking hard. The puppy can develop preferences to peeing on paper and actively seek a similar spot. Later, even a house-trained dog can eliminate on newspaper lying on the floor. The best thing is to teach your puppy to do their business outside.')  # noqa
    db.session.add(_9_new_dog_module_1_lesson_2_quiz)
    db.session.commit()

    _10_new_dog_module_1_lesson_2_training_skill_1 = Skill(title='Whistle', steps=["In this exercise you are teaching your dog to associate a specific whistle sound with a reward / to a treat.", "Start by standing or sitting next to your dog.", "Press the whistle button and immediately give a treat.", "A food reward must follow after each whistle so your dog learns whistle = food. You can use the whistle in the app."])  # noqa
    db.session.add(_10_new_dog_module_1_lesson_2_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=8, skill_id=10))

    _11_new_dog_module_1_lesson_2_training_skill_2 = Skill(title='Handling', steps=["It is important that your puppy is used to your hands, being touched and lifted up. This will come very handy in many life situations in the future.", "Lift your puppy up and put them on your lap or kneel next to them and hug, pulling them close to you. Wait until the puppy is calm and give them some treats.", "Put your puppy down or stop touching them when they are calm."])  # noqa
    db.session.add(_11_new_dog_module_1_lesson_2_training_skill_2)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=8, skill_id=11))

    _12_new_dog_module_1_lesson_2_training_skill_3 = Skill(title='Tug', steps=["Take a rope toy or a napkin, offer it to your dog and move it like a cat toy, wiggling on the ground. Once your dog \"attacks\" it, praise and gently pull on the toy.", "When your dog mouths it, gently shake and tug the rope toy to get the dog to hold and pull against you.", "When your dog tugs back on the rope toy, praise your dog enthusiastically. The game itself is the reward, no need for treats."])  # noqa
    db.session.add(_12_new_dog_module_1_lesson_2_training_skill_3)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=8, skill_id=12))

    _13_new_dog_module_1_lesson_2_training_activity = Activity(lesson_id=8, tasks=["Paws are a sensitive area for many dogs. Touch and apply light pressure when your dog is relaxed so the dog gets used to it."])  # noqa
    db.session.add(_13_new_dog_module_1_lesson_2_training_activity)
    db.session.commit()
