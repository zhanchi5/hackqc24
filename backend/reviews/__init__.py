from flask import Blueprint

reviews_bp = Blueprint('reviews', __name__, url_prefix='/api/reviews')

from . import reviews