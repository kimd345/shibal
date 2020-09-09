from dotenv import load_dotenv
from starter_app import app, db
from starter_app.models import User

load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    demo_user = User(email='user@demo.com')

    db.session.add(demo_user)

    db.session.commit()
