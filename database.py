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

    _15_new_dog_module_1_lesson_3_quiz = Quiz(lesson_id=14, prompt='Can the dog\'s crate be used as a punishment?', choices=['True', 'False'], answer_idx=1, explanation=['Crates are a great tool to provide your dog with a safe, puppy-proofed environment, a safe spot to hide from unwanted guests, and somewhere to sleep undisturbed.', 'A crate should be big enough so your dog can stand up and turn around comfortably, with space for food and water bowls. Your dog should not use the crate as a toilet. Soft bedding should be placed on the bottom so your dog can rest comfortably.', 'Do not crate your dog only when you leave home, so your dog does not associate your absence with the crate. When you are at home, provide some random time periods of crating.'])  # noqa
    db.session.add(_15_new_dog_module_1_lesson_3_quiz)
    db.session.commit()

    _16_new_dog_module_1_lesson_3_training_skill_1 = Skill(title='Crate I', steps=['Crates are a great tool to provide your dog with a safe, puppy-proofed environment.', 'Prepare some tasty treats, think of a verbal cue, for example, "sleep time," or "crate," or "time off" that you will use.', 'Give the cue and toss a treat in the crate. Praise your dog enthusiastically for entering the crate.', 'Give a release cue, "OK," or "free," or "that\'s it," to let your dog know they can exit the crate. Do not treat for leaving the crate.'])  # noqa
    db.session.add(_16_new_dog_module_1_lesson_3_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=14, skill_id=16))

    _17_new_dog_module_1_lesson_3_training_skill_2 = Skill(title='Name', steps=['Call your dog by name.', 'If your dog does not react, do not call out again. Instead, whistle or make kissy sounds to get the dog to look at you, and follow with a whistle and treat.', 'If your dog keeps their attention on you, distract them by throwing a toy or treat on the ground and call them by name again.'])  # noqa
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

# Module 2
# Lesson 1
    _36_new_dog_module_2 = Module(program_id=1, title='Module 2 - Teach basic commands')  # noqa
    db.session.add(_36_new_dog_module_2)
    db.session.commit()

    _37_new_dog_module_2_lesson_1 = Lesson(module_id=36, title='Lesson 1 - Resource guarding, Name II')  # noqa
    db.session.add(_37_new_dog_module_2_lesson_1)
    db.session.commit()

    _38_new_dog_module_2_lesson_1_quiz = Quiz(lesson_id=37, prompt='A puppy should not meet other dogs or people until after their second vaccination as the puppy could get an infection.', choices=['True', 'False'], answer_idx=0, explanation=['There was an ongoing debate about how high the risk is for a puppy to explore the world before their second vaccination. Many veterinarians and trainers are united in the opinion that the risk of not being socialized for life is higher than the risk of viruses. Of course, take possible precautions.', 'Do not take your puppy to places where there are many dogs. Carry your dog in your arms and visit friends\' dogs of who are healthy and vaccinated. You can also organize car rides so your dog can sniff and view the world through a window.', 'Puppies are curious and love to explore. Young puppies learn things effortlessly. The more new situations, environments, surfaces, and sounds they experience, the easier it is to live with them later. It is important to expose them to as many people, animals, and sounds as possible until they are 16-weeks-old, when fear starts developing. If puppies are constantly exposed to a situation or person they are more likely to react positively in the future.', 'Puppy socialization is the most important task you have as a dog parent.'])  # noqa
    db.session.add(_38_new_dog_module_2_lesson_1_quiz)
    db.session.commit()

    _39_new_dog_module_2_lesson_1_training_skill_1 = Skill(title='Resource Guarding', steps=['Put half of a portion of low value food like their kibble in a bowl, and while your dog is eating, stand at a distance and in a friendly voice say "what have you got there?" as you toss a high-value treat towards your dog. You want the treat to mean more to the dog than the food in the bowl, so your approach is seen as a wonderful thing.', 'Toss some food, stand up, take a few steps and toss food again, approaching and distancing from the dog. Your dog should be happy and relaxed when you approach.'])  # noqa
    db.session.add(_39_new_dog_module_2_lesson_1_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=37, skill_id=39))

    _40_new_dog_module_2_lesson_1_training_skill_2 = Skill(title='Name II', steps=['Perfect the name command, so that every time you call your dog he looks in your eyes, not at your hand holding the treat.', 'Call your dog by name. If they look in your eyes, whistle & treat.', 'If your dog looks in your direction but not into your eyes, DO NOT TREAT.', 'Hold the treat near your forehead. When your dog looks into your eyes, C&T.', 'Once the dog gets used to keeping eye contact, hide the treat in your pocket.'])  # noqa
    db.session.add(_40_new_dog_module_2_lesson_1_training_skill_2)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=37, skill_id=40))

    _41_new_dog_module_2_lesson_1_training_skill_3 = Skill(title='Crate II', steps=['Give the verbal cue to go to the crate. Once your dog is inside, praise and treat and close the door while giving treats through closed doors. If the dog starts to panic, close the door only halfway.', 'Once you close the door, treat tour dog while standing, take a few steps back, then return to give another treat.'])  # noqa
    db.session.add(_41_new_dog_module_2_lesson_1_training_skill_3)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=37, skill_id=41))

    _42_new_dog_module_2_lesson_1_activity = Activity(lesson_id=37, tasks=['Pass by a pharmacy. Greet an elderly person and ask them to reward your dog so your dog gets used to them.', 'Brush your dog\'s teeth. There is a special dog toothpaste that tastes like meat, with a positive association that teaches your dog to love tooth brushing.'])  # noqa
    db.session.add(_42_new_dog_module_2_lesson_1_activity)
    db.session.commit()

# Lesson 2
    _43_new_dog_module_2_lesson_2 = Lesson(module_id=36, title='Lesson 2 - Crate III, Search')  # noqa
    db.session.add(_43_new_dog_module_2_lesson_2)
    db.session.commit()

    _44_new_dog_module_2_lesson_2_quiz = Quiz(lesson_id=43, prompt='A dog needs a set of rules, so they are less stressed.', choices=['True', 'False'], answer_idx=0, explanation=['In a family, agree on the rules i.e. how the dog has to behave, what is allowed, and what is not. Will the pup be allowed, and what is not. Will the pip be allowed on a sofa, to sleep in bed, etc? It is important that everybody follows the same rules and the training methods are consistent. This will cause less confusion and misunderstanding.'])  # noqa
    db.session.add(_44_new_dog_module_2_lesson_2_quiz)
    db.session.commit()

    _45_new_dog_module_2_lesson_2_training_skill_1 = Skill(title='Crate III', steps=['Prepare a food bowl, a chew toy, or a toy stuffed with canned food.', 'Give the verbal cue to go to the crate and serve food or give a toy; close the door once the dog enters. Stay in the same room and read a book or watch TV.', 'If your dog is not done with the food or toy, open the door but do not let them bring food out of the crate. The dog has to understand that good things happen only in the crate.'])  # noqa
    db.session.add(_45_new_dog_module_2_lesson_2_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=43, skill_id=45))

    _46_new_dog_module_2_lesson_2_training_skill_2 = Skill(title='Search', steps=['The exercise is used to concentrate attention on the owner and release minor tensions; relax.', 'Sit down and show a treat to the dog. With the verbal cue "search," throw a treat on the ground towards the dog.', 'When the dog finds the treat and looks at you, immediately throw a second treat with the cue "search." Throw treats towards thed og, but vary the sides.'])  # noqa
    db.session.add(_46_new_dog_module_2_lesson_2_training_skill_2)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=43, skill_id=46))

    db.engine.execute(skills.insert().values(lesson_id=43, skill_id=40))

    _47_new_dog_module_2_lesson_2_activity = Activity(lesson_id=43, tasks=['Put your dog in a bathtub/shower, let the water run slowly, praise and reward your dog enthusiastically. With this activity build a positive association with the bathroom.', 'Feed tonight\'s dinner from your hands. Your dog will appreciate the food coming directly from you and next time will focus more on your hands.'])  # noqa
    db.session.add(_47_new_dog_module_2_lesson_2_activity)
    db.session.commit()

# Lesson 3
    _48_new_dog_module_2_lesson_3 = Lesson(module_id=36, title='Lesson 3 - Handling II, Sit')  # noqa
    db.session.add(_48_new_dog_module_2_lesson_3)
    db.session.commit()

    _49_new_dog_module_2_lesson_3_quiz = Quiz(lesson_id=48, prompt='At what age does a sense of fear develop?', choices=['One-month-old', 'Four-month-old', 'One-year-old', 'Never'], answer_idx=1, explanation=['Between the 12th and 16th weeks of life, the socialization period starts closing. Dogs start to become wary of other pets and humans that they don\'t know. Here, they will need a lot of positive reinforcement and support. We suggest whenever your puppy is in an unpleasant situation (like a vet visit, fireworks, etc.) meet the fear with a laugh and distract your friend with a game. A soothing reassurance and hiding with your pup under the table just deepens the experience instead of making the situation something to be laughed at. We suggest you walk your dog on the leash, so if he/she gets into any new, fearful situations you can easily take control.'])  # noqa
    db.session.add(_49_new_dog_module_2_lesson_3_quiz)
    db.session.commit()

    _50_new_dog_module_2_lesson_3_training_skill_1 = Skill(title='Handling II', steps=['Lift your puppy up and put them on your lap or kneel next to them and hug, pulling them close to you. Wait until the puppy is calm and give them some treats.', 'Touch your puppy\'s paws, check between nails. Reward them for a calm reaction.'])  # noqa
    db.session.add(_50_new_dog_module_2_lesson_3_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=48, skill_id=50))

    _51_new_dog_module_2_lesson_3_training_skill_2 = Skill(title='Sit', steps=['Treat in your hand, lift it from your dog\'s nose over their head.', 'Reward only when your dog sits down completely.', 'If your dog stays sitting, call your dog to you and repeat the exercise.'])  # noqa
    db.session.add(_51_new_dog_module_2_lesson_3_training_skill_2)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=48, skill_id=51))

    db.engine.execute(skills.insert().values(lesson_id=48, skill_id=46))

    _52_new_dog_module_2_lesson_3_activity = Activity(lesson_id=48, tasks=['Greet three men, ask them to give a treat to your dog. You want your dog to like men.', 'Ask your dog for a sit before giving food. It is a great way to show your dog how you want them to behave when excited or asking for something. You want your dog to sit, instead of jumping around.'])  # noqa
    db.session.add(_52_new_dog_module_2_lesson_3_activity)
    db.session.commit()

# Lesson 4
    _53_new_dog_module_2_lesson_4 = Lesson(module_id=36, title='Lesson 4 - Come, Down')  # noqa
    db.session.add(_53_new_dog_module_2_lesson_4)
    db.session.commit()

    _54_new_dog_module_2_lesson_4_quiz = Quiz(lesson_id=53, prompt='Before your dog learns a reliable recall, they should always be on a leash.', choices=['True', 'False'], answer_idx=0, explanation=['A dog who is still learning perfect recall is safer on a leash. Even in a fenced-off area, we recommend having a five-meter-long leash on the dog. Put it on the ground so the dog can drag it with them. If you need to call the dog back to you and the dog is distracted, you can gently pull on it and encourage the dog to come. The worst lesson is when we call the dog back to us, they ignore us, and we let the cue vanish into thin air. The leash allows the dog freedom, but also guarantees that the dog comes back when called. Recall is the most important skill in your friendship.'])  # noqa
    db.session.add(_54_new_dog_module_2_lesson_4_quiz)
    db.session.commit()

    _55_new_dog_module_2_lesson_4_training_skill_1 = Skill(title='Come', steps=['At home call "come," and run away from your dog.', 'If your dog follows, praise them very enthusiastically and give lots of treats.', 'If your dog is not interested, take a squeaky toy and play energetically with it. Only if you get your dog\'s attention, call "come," and show the toy to your dog. Praise very enthusiastically, and play with your dog.'])  # noqa
    db.session.add(_55_new_dog_module_2_lesson_4_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=53, skill_id=55))

    _56_new_dog_module_2_lesson_4_training_skill_2 = Skill(title='Down', steps=['Make your dog focus on you and your hand with a treat. Keep the treat near your dog\'s nose.', 'Slowly move the treat downwards in front of your dong\'s nose.', 'Once chest and elbows are on the ground, reward with another W&T!', 'Alternatively, try this method - if your dog is struggling you can sit down, bend your knees, and lure your dog to crawl under. Once his/her body is under your knees, W&T.', 'Once the dog gets comfortable crawling, hold your hand with a treat on the ground, next to your leg. Squeeze the treat between your fingers so it takes time to eat it. When your dog lays down, W&T.'])  # noqa
    db.session.add(_56_new_dog_module_2_lesson_4_training_skill_2)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=53, skill_id=56))

    db.engine.execute(skills.insert().values(lesson_id=53, skill_id=51))

    _57_new_dog_module_2_lesson_4_activity = Activity(lesson_id=53, tasks=['Train recall. Call your dog to you before serving dinner.', 'Walk Strangely, swinging from side to side, reward your dog for friendly, curious behavior. In this way teach your dog to ignore people who walk in uncoordinated ways, e.g. kids, drunk people.'])  # noqa
    db.session.add(_57_new_dog_module_2_lesson_4_activity)
    db.session.commit()

# Lesson 5
    _58_new_dog_module_2_lesson_5 = Lesson(module_id=36, title='Lesson 5 - Sit II')  # noqa
    db.session.add(_58_new_dog_module_2_lesson_5)
    db.session.commit()

    _59_new_dog_module_2_lesson_5_quiz = Quiz(lesson_id=58, prompt='Dogs are good at generalizing, e.g. a baby, a child, a man or an older woman, in your dog\'s mind, are all the same and put in a category "people."', choices=['True', 'False'], answer_idx=0, explanation=['Dogs, unlike humans, are good at generalizing. For a reliable response in real-life situations, train your dog in different circumstances.', 'Surfaces: dogs might feel uncomfortable sitting or laying down on sand, carpet, grass, pavement, etc.', 'Environment: performing at home is different to outside, where, for example, cars, strangers, and dogs are distracting. Increase the stimuli slowly, and train in different environments.', 'Your dog may sit down perfectly in front of you, but does he or she respond to you when you stand diagonally to their body position, or behind them?'])  # noqa
    db.session.add(_59_new_dog_module_2_lesson_5_quiz)
    db.session.commit()

    _60_new_dog_module_2_lesson_5_training_skill_1 = Skill(title='Sit II', steps=['In this exercise, we want to add a verbal cue and fade out the luring. Start with your dog laying or standing near you.', 'As in level 1, lure your dog into a sit by lifting your hand from the dog\'s nose in an upward direction. Just before the dog sits, add a verbal cue SIT. Whistle and treat when the dog sits down.', 'Repeat the exercise. Give a verbal cue and do the gesture with an empty hand. Once your dog gets into the position, whistle and give them a treat from your pocket.', 'If your dog stays sitting, call your dog to you and repeat the exercise.'])  # noqa
    db.session.add(_60_new_dog_module_2_lesson_5_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=58, skill_id=60))

    db.engine.execute(skills.insert().values(lesson_id=58, skill_id=56))

    _61_new_dog_module_2_lesson_5_activity = Activity(lesson_id=58, tasks=['Do a training session in a different room than usual. Dogs find it harder to focus in another environment.', 'Ask your dog to sit before opening the door to go outside. It helps your dog to focus and pay attention to you.', ])  # noqa
    db.session.add(_61_new_dog_module_2_lesson_5_activity)
    db.session.commit()

# Lesson 6
    _62_new_dog_module_2_lesson_6 = Lesson(module_id=36, title='Lesson 6 - Down II, Put on a leash')  # noqa
    db.session.add(_62_new_dog_module_2_lesson_6)
    db.session.commit()

    _63_new_dog_module_2_lesson_6_quiz = Quiz(lesson_id=62, prompt='What is positive training?', choices=['You are not allowed to correct or use negative cues when training.', 'Reward our dog for the behavior you like.', 'Both'], answer_idx=1, explanation=['Positive dog training is based on the principle that if you reward and praise a dog for a behavior, the dog is more likely to repeat it and offer it to you. Often misbehavior, like aggression, biting, or barking stems from fear and timidity. So, pulling on a collar, or scolding your dog when they bark at a man with a hat because your dog is terrified of hats, is making things much worse. With impatience and harsh treatment, you only confirm that the dog has to be fearful of hats, because whenever your pup sees a hat and tries to warn you, you shout at the dog and pull on its lead causing an unpleasant sensation. Be patient and ignore the unwanted behavior, or redirect your dog\'s attention to other things like a toy, a treat, or a change in walking direction.', 'Also, praise your dog when they do not react to a passing cyclist or a ball bouncing nearby. Even though you take it for granted that a dog should not run away and catch the ball, it is against your dog\'s instincts to stay non-reactive to a fast-moving object.'])  # noqa
    db.session.add(_63_new_dog_module_2_lesson_6_quiz)
    db.session.commit()

    _64_new_dog_module_2_lesson_6_training_skill_1 = Skill(title='Down II', steps=['In this exercise, add a verbal cue and fade out the luring. Start with your dog sitting or standing near you.', 'Give your dog the command "down," and wait without showing the food.', 'Repeat the exercise. Give a verbal cue and do the gesture with an empty hand. Once your dog gets into the position, whistle and give them a treat from your pocket.'])  # noqa
    db.session.add(_64_new_dog_module_2_lesson_6_training_skill_1)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=62, skill_id=64))

    _65_new_dog_module_2_lesson_6_training_skill_2 = Skill(title='Put on a leash', steps=['Ask your dog to "sit," without rewards this time. Have your leash within arms reach.', 'Pick up the leash. If your dog barks or jumps, put the leash on the floor and turn your back to your dog.', 'Once your dog has calmed down, pick the leash back up.', 'Only attach the leash once your dog is calm. Off you go for a good, long walk. After all that hard work, you don\'t need whistles and treats here. The walk is a reward in itself!'])  # noqa
    db.session.add(_65_new_dog_module_2_lesson_6_training_skill_2)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=62, skill_id=60))

    db.engine.execute(skills.insert().values(lesson_id=62, skill_id=56))

    _66_new_dog_module_2_lesson_6_activity = Activity(lesson_id=62, tasks=['Ask your dog to sit while you put on the leash. Walking outside is an exciting time, sitting down will prevent your dog getting hyper even before you leave the house.', 'Practice the "down" exercise five times on asphalt. A different surface might surprise your dog and you want to teach them a reliable response in all life-situations.'])  # noqa
    db.session.add(_66_new_dog_module_2_lesson_6_activity)
    db.session.commit()

# Lesson 7
    _67_new_dog_module_2_lesson_7 = Lesson(module_id=36, title='Lesson 7 - Revision')  # noqa
    db.session.add(_67_new_dog_module_2_lesson_7)
    db.session.commit()

    _68_new_dog_module_2_lesson_7_quiz = Quiz(lesson_id=67, prompt='It is natural for dogs to hold eye contact with humans.', choices=['True', 'False'], answer_idx=1, explanation=['In dog-to-dog language staring into the eyes is threatening behavior. However, dogs have learned to communicate with humans by looking them in the eyes. With training, dogs learn to check-in with their humans and hold eye-contact. This is a very useful skill, so your dog not only relies on sound but also on your body language cues.'])  # noqa
    db.session.add(_68_new_dog_module_2_lesson_7_quiz)
    db.session.commit()

    db.engine.execute(skills.insert().values(lesson_id=67, skill_id=65))

    _70_new_dog_module_2_lesson_7_activity = Activity(lesson_id=67, tasks=['Brush your dog\'s coat. Praise and reward your dog for not resisting.', 'Invite a guest to your house and ask your dog to greet them politely by sitting down. Teach your dog the polite way to say, "Hello."'])  # noqa
    db.session.add(_70_new_dog_module_2_lesson_7_activity)
    db.session.commit()
