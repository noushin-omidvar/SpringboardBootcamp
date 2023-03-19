"""Seed file to make sample data for pets db."""

from models import User, Post, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()

# Add pets
Alan = User(first_name='Alan', last_name="Alda")
Joel = User(first_name='Joel', last_name="Burton")
Jane = User(first_name='Jane', last_name="Smith")

# Add new objects to session, so they'll persist
db.session.add(Alan)
db.session.add(Joel)
db.session.add(Jane)

# Commit--otherwise, this never gets saved!
db.session.commit()


# If table isn't empty, empty it
Post.query.delete()

# Add pets
post1 = Post(title='first Post!', content="Alakiiii", user_id=1)
post2 = Post(title='Yet Another post', content="Burlakiiii", user_id=1)
post3 = Post(title='Flask is awesome', content="Smlakiiii", user_id=2)

# Add new objects to session, so they'll persist
db.session.add(post1)
db.session.add(post2)
db.session.add(post3)
# Commit--otherwise, this never gets saved!
db.session.commit()
