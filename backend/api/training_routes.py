from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from backend.models import (db, Program, Module, Lesson, Quiz,
                            skills, Skill, Activity, Enrollment)

training_routes = Blueprint('trainings', __name__)


@training_routes.route('', methods=['GET'])
# @jwt_required
def getPrograms():
    programs = Program.query.all()
    return {'programs': [program.to_dict() for program in programs]}


@training_routes.route('/enrollments/<dogId>', methods=['GET'])
def getEnrollments(dogId):
    enrollments = Enrollment.query.filter(Enrollment.dog_id == dogId)
    print('ENNNRROOOLLLMMEEENNNTTTSSS')
    print(enrollments)
    return {'enrollments': [enrollment.to_dict() for enrollment in enrollments]}, 200  # noqa


@training_routes.route('/enrollments', methods=['POST'])
def createEnrollment():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    entity_id = request.json.get('entityId', None)
    dog_id = request.json.get('dogId', None)
    entity_type = request.json.get('entityType', None)
    status = request.json.get('status', None)

    if not entity_id:
        return {"msg": "Entity not found"}, 400
    if not dog_id:
        return {"msg": "Dog not found"}, 400

    enrollment = Enrollment(entity_id=entity_id, dog_id=dog_id, entity_type=entity_type, status=status)  # noqa

    db.session.add(enrollment)
    db.session.commit()

    return enrollment.to_dict(), 200
