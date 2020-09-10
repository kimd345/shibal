from werkzeug.security import generate_password_hash
from dotenv import load_dotenv
from server import app, db
from server.models import User

load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    demo_user = User(email='user@demo.com',
                     hashed_password=generate_password_hash('password'))

    db.session.add(demo_user)

    db.session.commit()
