from flask import Blueprint, request, jsonify, send_file
from services.file_service import (
    upload_file_service, 
    get_files_service, 
    download_file_service,
    get_activity_log_service
)

file_blueprint = Blueprint('file_blueprint', __name__)

@file_blueprint.route('/upload', methods=['POST'])
def upload_file():
    return upload_file_service(request)

@file_blueprint.route('/files', methods=['GET'])
def get_files():
    return get_files_service()

@file_blueprint.route('/download/<file_id>/<file_type>', methods=['GET'])
def download_file(file_id, file_type):
    return download_file_service(file_id, file_type)

@file_blueprint.route('/activity_logs', methods=['GET'])
def get_activity_logs():
    return get_activity_log_service()
