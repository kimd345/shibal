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

    _4_new_dog_module_1_lesson_1_quiz = Quiz(lesson_id=3, prompt='In the first week many new dog parents will hear their puppy crying at night. How should you react when you hear your puppy cry?', choices=['Take the puppy to your arms. You want to create a safe space and bond.', 'Tell your puppy to "hush" and shake lightly by the scruff, as dog mum.', 'Make sure your dog doesn\'t need to pee. Otherwise, ignore the puppy.'], answer_idx=2, explanation=['New home, no siblings, it is normal that your puppy will feel lonely and insecure at night. But, you should think about what your reaction will teach them. Whining = sleeping in the bed. If you don\'t want your dog to sleep in your bed in the future, put earplugs in and ignore your puppy. They will calm down.'])  # noqa
    db.session.add(_4_new_dog_module_1_lesson_1_quiz)
    db.session.commit()

    _5_new_dog_module_1_lesson_1_training_skill_1 = Skill(title='Hand Feeding', steps=['After this exercise, your dog will pay more attention to you and your hands. Get your dog\'s attention and show super tasty food in your hand.', 'Feed your dog while walking backwards. Your dog follows you and eats from your hand.'])  # noqa
    db.session.add(_5_new_dog_module_1_lesson_1_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=3, skill_id=5))

    _6_new_dog_module_1_lesson_1_training_skill_2 = Skill(title='Potty Training', steps=['To be successful in potty training it is important to have a consistent schedule. Take your puppy to their designated potty area 15 to 30 minutes after feeding time, or immediately after they wake up.', 'If your dog cannot be taken outside then the spot should be as close to the doors; placing a sponge soaked in urine might help your puppy find the correct place.', 'Once you are outside, concentrate on the mission. Keep your dog on a short lead, allow sniffing, but do not play until they are done.', 'After your pet has been eliminated, praise enthusiastically and reward with time outside to explore, or have playtime.', 'Set reminders to take your puppy outside. A puppy of 1 month can hold it for 1 hour, 2 months - 2 hours, etc. Your dog should not be left alone for longer than six hours without a potty break.'])  # noqa
    db.session.add(_6_new_dog_module_1_lesson_1_training_skill_2)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=3, skill_id=6))

    _7_new_dog_module_1_lesson_1_activity = Activity(lesson_id=3, tasks=['Introduce your puppy to two family members. They should greet the dog by getting down low to puppy\'s level and pet them gently.'])  # noqa
    db.session.add(_7_new_dog_module_1_lesson_1_activity)
    db.session.commit()

    # Lesson 2
    _8_new_dog_module_1_lesson_2 = Lesson(module_id=2, title='Lesson 2 - Whistle, Handling, Tug')  # noqa
    db.session.add(_8_new_dog_module_1_lesson_2)
    db.session.commit()

    _9_new_dog_module_1_lesson_2_quiz = Quiz(lesson_id=8, prompt='If your dog is trained to go to the toilet at home...', choices=['The designated spot should be near the bed.', 'Rugs and newspapers are good for training.', 'The spot should be in a quiet place.'], answer_idx=2, explanation=["Teaching your dog to eliminate on puppy pads, on paper, or in a litter box can make housebreaking hard. The puppy can develop preferences to peeing on paper and actively seek a similar spot. Later, even a house-trained dog can eliminate on newspaper lying on the floor. The best thing is to teach your puppy to do their business outside."])  # noqa
    db.session.add(_9_new_dog_module_1_lesson_2_quiz)
    db.session.commit()

    _10_new_dog_module_1_lesson_2_training_skill_1 = Skill(title='Whistle', steps=['In this exercise you are teaching your dog to associate a specific whistle sound with a reward / to a treat.', 'Start by standing or sitting next to your dog.', 'Press the whistle button and immediately give a treat.', 'A food reward must follow after each whistle so your dog learns whistle = food. You can use the whistle in the app.'])  # noqa
    db.session.add(_10_new_dog_module_1_lesson_2_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=8, skill_id=10))

    _11_new_dog_module_1_lesson_2_training_skill_2 = Skill(title='Handling', steps=['It is important that your puppy is used to your hands, being touched and lifted up. This will come very handy in many life situations in the future.', 'Lift your puppy up and put them on your lap or kneel next to them and hug, pulling them close to you. Wait until the puppy is calm and give them some treats.', 'Put your puppy down or stop touching them when they are calm.'])  # noqa
    db.session.add(_11_new_dog_module_1_lesson_2_training_skill_2)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=8, skill_id=11))

    _12_new_dog_module_1_lesson_2_training_skill_3 = Skill(title='Tug', steps=['Take a rope toy or a napkin, offer it to your dog and move it like a cat toy, wiggling on the ground. Once your dog "attacks" it, praise and gently pull on the toy.', 'When your dog mouths it, gently shake and tug the rope toy to get the dog to hold and pull against you.', 'When your dog tugs back on the rope toy, praise your dog enthusiastically. The game itself is the reward, no need for treats.'])  # noqa
    db.session.add(_12_new_dog_module_1_lesson_2_training_skill_3)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=8, skill_id=12))

    _13_new_dog_module_1_lesson_2_activity = Activity(lesson_id=8, tasks=['Paws are a sensitive area for many dogs. Touch and apply light pressure when your dog is relaxed so the dog gets used to it.'])  # noqa
    db.session.add(_13_new_dog_module_1_lesson_2_activity)
    db.session.commit()

# Lesson 3
    _14_new_dog_module_1_lesson_3 = Lesson(module_id=2, title='Lesson 3 - Crate I, Name')  # noqa
    db.session.add(_14_new_dog_module_1_lesson_3)
    db.session.commit()

    _15_new_dog_module_1_lesson_3_quiz = Quiz(lesson_id=14, prompt='If your dog is trained to go to the toilet at home...', choices=['True', 'False'], answer_idx=1, explanation=['Crates are a great tool to provide your dog with a safe, puppy-proofed environment, a safe spot to hide from unwanted guests, and somewhere to sleep undisturbed.', 'A crate should be big enough so your dog can stand up and turn around comfortably, with space for food and water bowls. Your dog should not use the crate as a toilet. Soft bedding should be placed on the bottom so your dog can rest comfortably.', 'Do not crate your dog only when you leave home, so your dog does not associate your absence with the crate. When you are at home, provide some random time periods of crating.'])  # noqa
    db.session.add(_15_new_dog_module_1_lesson_3_quiz)
    db.session.commit()

    _16_new_dog_module_1_lesson_3_training_skill_1 = Skill(title='Crate I', steps=['Crates are a great tool to provide your dog with a safe, puppy-proofed environment.', 'Prepare some tasty treats, think of a verbal cue, for example, "sleep time," or "crate," or "time off" that you will use.', 'Give the cue and toss a treat in the crate. Praise your dog enthusiastically for entering the crate.', 'Give a release cue, "OK," or "free," or "that\'s it," to let your dog know they can exit the crate. Do not treat for leaving the crate.'])  # noqa
    db.session.add(_16_new_dog_module_1_lesson_3_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=14, skill_id=16))

    _17_new_dog_module_1_lesson_3_training_skill_2 = Skill(title='Name', steps=['Call your dog by name.', 'If your dog does not react, do not call out again. Instead, click or make kissy sounds to get the dog to look at you, and follow with a whistle and treat.', 'If your dog keeps their attention on you, distract them by throwing a toy or treat on the ground and call them by name again.'])  # noqa
    db.session.add(_17_new_dog_module_1_lesson_3_training_skill_2)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=14, skill_id=17))
    db.engine.execute(skills.insert().values(lesson_id=14, skill_id=12))

    _18_new_dog_module_1_lesson_3_activity = Activity(lesson_id=14, tasks=['Feed tonight\'s dinner from your hands. Your dog will appreciate the food coming directly from you and next time will focus more on your hands.', 'Weigh your dog. Note the weight so you can compare it in the future.'])  # noqa
    db.session.add(_18_new_dog_module_1_lesson_3_activity)
    db.session.commit()

# Lesson 4
    _19_new_dog_module_1_lesson_4 = Lesson(module_id=2, title='Lesson 4 - Meet and greet, Name in a circle')  # noqa
    db.session.add(_19_new_dog_module_1_lesson_4)
    db.session.commit()

    _20_new_dog_module_1_lesson_4_quiz = Quiz(lesson_id=19, prompt='As the parent of a two-month-old puppy, your top priority in training should be?', choices=['The puppy is too young to train', 'Socialization and potty training', 'Obedience training'], answer_idx=1, explanation=['It is important to expose your puppy to as many new situations, people, sounds, and environments as you can. If they get acquainted with new things and situations up until they are four-months-old, they will be more relaxed in the future.', 'Potty training: The best time to start house training a dog is between 7,5 and 8,5 weeks. This is when puppies develop preferences and will actively search for the chosen substrate. So, if you teach your dog to pee on grass, your dog will avoid peeing elsewhere.'])  # noqa
    db.session.add(_20_new_dog_module_1_lesson_4_quiz)
    db.session.commit()

    _21_new_dog_module_1_lesson_4_training_skill_1 = Skill(title='Meet and Greet', steps=['Teach your dog that it is not exciting if you come back home or from the bathroom. This is a building block to being confident when alone.', 'Get your dog\'s attention and feed them a few treats. With your hands or pockets still full of treats, stand up and go to another room or bathroom. Close the door behind you so your puppy is alone.', 'If your dog is not scratching the door, open it and ignore the puppy. Reward them only if they are calm.', 'If your dog is scratching the door wait until they calm down; only then open the door.', 'If your puppy is sxcited to see you and jumps and barks, turn your back on them. Don\'t talk to them or hold any eye contact. Once te dog calms down or sits politely, pet and praise your dog.', 'Once the dog calms down or sits, pet and praise him/her.'])  # noqa
    db.session.add(_21_new_dog_module_1_lesson_4_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=19, skill_id=21))

    _22_new_dog_module_1_lesson_4_training_skill_2 = Skill(title='Name in a circle', steps=['Make sure all family members are involved in training, so your dog responds to everyone. Sit in a circle or in front of each other, with a few meters in between.', 'One person enthusiastically calls the puppy by name and rewards them with petting and treats.', 'Without a big pause, another person calls the puppy by name and rewards them for reacting. Repeat the exercise, making it as fun as possible.'])  # noqa
    db.session.add(_22_new_dog_module_1_lesson_4_training_skill_2)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=19, skill_id=22))
    db.engine.execute(skills.insert().values(lesson_id=19, skill_id=17))

    _23_new_dog_module_1_lesson_4_activity = Activity(lesson_id=19, tasks=['Invite two or three guests over to meet your dog. Socialization with different people is important to your dog\'s development.'])  # noqa
    db.session.add(_23_new_dog_module_1_lesson_4_activity)
    db.session.commit()

# Lesson 5
    _24_new_dog_module_1_lesson_5 = Lesson(module_id=2, title='Lesson 5 - Bite inhibition, Put a collar on your dog')  # noqa
    db.session.add(_24_new_dog_module_1_lesson_5)
    db.session.commit()

    _25_new_dog_module_1_lesson_5_quiz = Quiz(lesson_id=24, prompt='Puppies are born with one set of teeth and don\'t change them throughout life.', choices=['True', 'False'], answer_idx=1, explanation=['At around four months of age puppies will start losing their primary teeth. At this stage, your puppy will be showing more chewing, mouthing behavior. Make sure you offer them toys and chews, otherwise your furniture and shoes might be at risk.'])  # noqa
    db.session.add(_25_new_dog_module_1_lesson_5_quiz)
    db.session.commit()

    _26_new_dog_module_1_lesson_5_training_skill_1 = Skill(title='Bite Inhibition', steps=['Initiate an energetic and rough play session with your puppy. Tease with your hands, roll around with your dog in a playful, yet active, manner.', 'If your puppy gets very excited and bites, squeak in a high pitch, take a time out, and hold your hand as if it hurts.', 'If your puppy doesn\'t react to your squeak and keeps being rough, stand up, leave the room and shut the door. Return after a minute and resume playing.', 'Your puppy will learn that hard bites interrupt and otherwise enjoyable play session. Therefore, will choose to avoid biting or be more gentle.'])  # noqa
    db.session.add(_26_new_dog_module_1_lesson_5_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=24, skill_id=26))

    _27_new_dog_module_1_lesson_5_training_skill_2 = Skill(title='Put a collar on your dog', steps=['Put on a collar and feed your dog from the hand or play with their favorite toy.', 'Take the collar off and stop any fun activities with your puppy.'])  # noqa
    db.session.add(_27_new_dog_module_1_lesson_5_training_skill_2)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=24, skill_id=27))
    db.engine.execute(skills.insert().values(lesson_id=24, skill_id=22))

    _28_new_dog_module_1_lesson_5_activity = Activity(lesson_id=24, tasks=['Check when your dog has to get vaccinated or de-wormed.'])  # noqa
    db.session.add(_28_new_dog_module_1_lesson_5_activity)
    db.session.commit()

# Lesson 6
    _29_new_dog_module_1_lesson_6 = Lesson(module_id=2, title='Lesson 6 - Crate II')  # noqa
    db.session.add(_29_new_dog_module_1_lesson_6)
    db.session.commit()

    _30_new_dog_module_1_lesson_6_quiz = Quiz(lesson_id=29, prompt='To avoid your dog seeking attention in undesirable ways you should teach your dog an alternative / default behavior.', choices=['True', 'False'], answer_idx=0, explanation=['Teaching your dogs the canine equivalent of asking "please?" when desiring something can result in a huge improvement in your quality of life. For example, whenever your dog wants something - a toy, an interaction, food, they should sit down politely and wait.', 'Conditioned default or automatic behaviors can override instinctive behaviors. The default behavior is one that the dog can fall back on when eager, frustrated, agitated, or just plain wants something that they cannot get. This behavior needs to be practiced to the point where it becomes automatic in nearly any situation.'])  # noqa
    db.session.add(_30_new_dog_module_1_lesson_6_quiz)
    db.session.commit()

    _31_new_dog_module_1_lesson_6_training_skill_1 = Skill(title='Crate II', steps=['Give the verbal cue to go to the crate. Once your dog is inside, praise and treat and close the door while giving treats through closed doors. If the dog starts to panic, close the door only halfway.', 'Once you close the door, treat your dog while standing, take a few steps back, then return to give another treat.'])  # noqa
    db.session.add(_31_new_dog_module_1_lesson_6_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=29, skill_id=31))
    db.engine.execute(skills.insert().values(lesson_id=29, skill_id=27))

    _32_new_dog_module_1_lesson_6_activity = Activity(lesson_id=29, tasks=['Ring the door bell, reward for no reaction. A lot of dogs get excited about the doorbell because this means guests or strangers are coming.', 'Initiate a play when your dog is relaxed or sleeping so your dog learns that being calm also earns your attention.'])  # noqa
    db.session.add(_32_new_dog_module_1_lesson_6_activity)
    db.session.commit()

# Lesson 7
    _33_new_dog_module_1_lesson_7 = Lesson(module_id=2, title='Lesson 7 - Revision')  # noqa
    db.session.add(_33_new_dog_module_1_lesson_7)
    db.session.commit()

    _34_new_dog_module_1_lesson_7_quiz = Quiz(lesson_id=33, prompt='When should you deliver a reward?', choices=['Immediately after the whistle signal', 'Just before pressing the whistle'], answer_idx=0, explanation=['A treat should follow immediately after the whistle, as this marks the exact moment when your dog performed. Reward for the performance.'])  # noqa
    db.session.add(_34_new_dog_module_1_lesson_7_quiz)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=33, skill_id=31))

    _35_new_dog_module_1_lesson_7_activity = Activity(lesson_id=33, tasks=['Meet your neighbor\'s dogs in a neutral environment. Keep all dogs on a leash, so you can control the situation.'])  # noqa
    db.session.add(_35_new_dog_module_1_lesson_7_activity)
    db.session.commit()
