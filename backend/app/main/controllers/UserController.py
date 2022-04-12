
from app import db
from app.main.models.User import User
from ..utils import serialize
from flask import request

class UserController():
    #@login_required
    def index():
        users = User.query.all()
        return { "response": serialize(users) }

    def store():
        user = User(request.json.get('email'), request.json.get('password'), True)
        user = db.session.add(user)
        db.session.commit()
        return { "response": serialize(user) }
        
    def show(id):
        user = User.query.filter(User.id == id).first()
        return { "response": serialize(user) }

    def get_by_email(email):
        user = User.query.filter(User.email == email).first()
        return { "response": serialize(user) }

    def update(id):
        ...
        
    def delete(id):
        user = User.query.filter(User.id == id).delete()
        return { "response_deleted": serialize(user) }
