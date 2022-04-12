from flask import Blueprint
from app.main.controllers.UserController import UserController

user_bp = Blueprint('user_bp', __name__)

user_bp.route('/', methods=['GET'])(UserController.index)
user_bp.route('/', methods=['POST'])(UserController.store)
user_bp.route('/<email>', methods=['GET'])(UserController.get_by_email)