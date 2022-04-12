from flask import Flask, jsonify, request
from authlib.integrations.flask_client import OAuth
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import config
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from flask_jwt_extended import create_access_token, JWTManager


db = SQLAlchemy(session_options={"autoflush": False})

def create_app(app_config='development'):
    app = Flask(__name__)
    app.config.from_object(config[app_config])
    cors = CORS(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)

    #Blueprints
    from app.main.routes.store_bp import store_bp
    from app.main.routes.transaction_bp import transaction_bp
    from app.main.routes.user_bp import user_bp


    app.register_blueprint(store_bp, url_prefix='/stores')
    app.register_blueprint(transaction_bp, url_prefix='/transactions')
    app.register_blueprint(user_bp, url_prefix='/users')


    

    ### swagger specific ###
    SWAGGER_URL = '/apidocs'
    API_URL = '/static/swagger.json'
    SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            'app_name': "Flaks-Bycoders-Challenge"
        }
    )
    app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
    ### end swagger specific ###
    
    @app.route('/token', methods=['POST'])
    def create_token():
        email = request.json.get('email', None)
        password = request.json.get('password', None)

        #Use test/test
        if email != 'test' or password != 'test':
            return jsonify({"msg": "Bad username or password."}), 401

        access_token = create_access_token(identity=email)


        return jsonify(access_token=access_token)
    
    db.init_app(app)
    return app
