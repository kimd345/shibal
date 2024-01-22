<p align="right">
      <img src="frontend/src/assets/logo.png" width="80px" alt="wogos"/>
</p>

---
### A mobile app for shiba inu owners to train and bond with their companion

---
*By Dan Kim*<br><br>
Welcome to Shibal! Shibal is an Android/iOS cross-platform mobile app built with React Native and Flask maintained in one code base. Shibal offers a one-stop tool for training your shiba inu through detailed modules in the form of online education and socializing with other owners on a social media platform. It is inspired by [DOGO](https://dogo.app/), a popular dog training app.

<p align="center">
      <img src="documentation/readme/welcome_screen.gif">
</p>

*tested on iPhone 15 and Galaxy S23*

---

#### Technologies at a glance:

- Frontend - JavaScript | React Native | Redux
- Backend - Python | Flask
- Database - PostgreSQL / AWS S3
- Styling - JSX

---

## Features<br>
<img margin-right="50px" src="documentation/readme/authentication.gif" align="right" width="200px"><br><br><br><br>
### Authentication<br>
Sign up or log in with email and password<br><br>
###### Secure with JWT token and SHA-256 hashing<br>
###### Data integrity with frontend and backend validations<br>
###### Bootstrap user across app navigation with useAuth custom hook<br><br><br><br><br><br><br><br><br>


<img src="documentation/readme/create_dog.gif" align="left"><br><br><br><br>
### Dog Profiles<br>
Create one or more profiles for your dog(s)<br>
Select dog to train<br><br>
###### Upload profile image to AWS S3<br>
###### Enter info with custom input and picker components<br><br><br><br><br><br><br><br><br><br>


<img margin-right="50px" src="documentation/readme/training.gif" align="right"><br><br><br><br><br>
### Training Programs<br>
Navigate between training programs and submodules<br>
Keep track of your dog's progress<br><br>
###### Manage nested training progress state with Redux<br>
###### Process state with recursive logic via useProgress custom hook<br><br><br><br><br><br><br><br><br>


<img src="documentation/readme/social.gif" align="left"><br><br><br>
### Social<br>
Post photos of your dog to the feed<br>
Browse recent posts<br>
Like posts from the community<br><br>
###### Fetch posts realtime with useFocusEffect native hook<br>
###### Handle like and unlike with composite primary key<br><br><br><br><br><br><br><br><br><br><br>


---
### Entity Relationship Diagram

<img src="documentation/Entity_Relationship_Diagram.png" />
