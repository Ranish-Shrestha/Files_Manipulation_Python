from pymongo import MongoClient
from bson import ObjectId

client = MongoClient('mongodb://localhost:27017/')
db = client['fileDB']

file_collection = db['files']
log_collection = db['logs']

def file_schema(filename, file_extension, file_size, content):
    return {
        "filename": filename,
        "file_extension": file_extension,
        "file_size": file_size,
        "content": content,
        "download_count": 0
    }

def log_schema(action, details):
    return {
        "action": action,
        "details": details,
        "timestamp": datetime.utcnow()
    }
