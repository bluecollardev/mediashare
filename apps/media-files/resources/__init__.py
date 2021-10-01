from flask_restx import Api
from .files import api as files_api

api = Api(
    title='File Manager API',
    version='1.0',
    description='File Manager to handle requests to S3 bucket',
    prefix='/api/v1')

api.add_namespace(files_api, path='/:wq')
