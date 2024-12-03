from pymongo import MongoClient 
from datetime import datetime

client = MongoClient('mongodb+srv://ranishstha:NjIXxKkVbbScg34q@filescluster.vi3ts.mongodb.net/?retryWrites=true&w=majority&appName=filesCluster')
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
        "timestamp": datetime.now()
    }
