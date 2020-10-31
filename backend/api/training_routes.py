from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from backend.models import (db, Program, Module, Lesson, Quiz,
                            Training, Skill, Activity)

training_routes = Blueprint('trainings', __name__)


@training_routes.route('', methods=['GET'])
def getPrograms():
    programs = Program.query.all()
    return {'programs': [program.to_dict() for program in programs]}
