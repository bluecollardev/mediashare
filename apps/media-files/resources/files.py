import os
from flask import request, redirect, send_file
from flask import make_response
from flask_restx import Namespace, Resource
from ..services.access_files import AccessBucket
from ..utils.util import cors_preflight

"""
File Manager for S3 End-Point Namespace.
Provides the mount point for all of operation end-points.
"""
api = Namespace('fileManager', description='API for Managing files in S3')

upload_directory = os.getenv('UPLOAD_DIRECTORY')
bucket = os.getenv('BUCKET')


@cors_preflight('GET')
@api.route('/buckets', strict_slashes=False, methods=['GET', 'OPTIONS'])
class Buckets(Resource):
    @staticmethod
    def get():
        service = AccessBucket()
        contents = service.list_files("{}".format(bucket))
        payload = contents.to_json()
        response = make_response(payload, 200)

        return response


@cors_preflight('POST, GET')
@api.route('/file', methods=['POST', 'GET', 'OPTIONS'])
class File(Resource):
    @staticmethod
    def post(self):
        if request.method == 'POST':
            service = AccessBucket()
            f = request.files['file']
            f.save(os.path.join(upload_directory, f.filename))
            service.upload_file(f"{0}{1}".format(upload_directory, f.filename), bucket)

            return redirect("/storage")

    @staticmethod
    def get(filename):
        if request.method == 'GET':
            service = AccessBucket
            directory = os.getenv()
            output = service.download_file(directory, filename, bucket)

            return send_file(output, as_attachment=True)
