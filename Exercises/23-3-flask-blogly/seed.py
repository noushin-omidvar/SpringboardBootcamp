"""Seed file to make sample data for pets db."""

from models import User, Post, db, Tag, PostTag
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

# Add tags
tag1 = Tag(name="Fun")
tag2 = Tag(name="Even More")
tag3 = Tag(name="Bloop")

# Add new objects to session, so they'll persist
db.session.add(tag1)
db.session.add(tag2)
db.session.add(tag3)


post1.tags.append(tag1)
post1.tags.append(tag2)
post2.tags.append(tag1)
post2.tags.append(tag3)
post3.tags.append(tag2)
post3.tags.append(tag3)


# Commit--otherwise, this never gets saved!
db.session.commit()
