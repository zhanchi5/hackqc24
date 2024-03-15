from flask import Blueprint

housing_bp = Blueprint('housing', __name__, url_prefix='/api/housing')

from .housing import housing_bp as housing_bp
