from bson import ObjectId

def convert_objectid(document):
    if isinstance(document, list):
        return [convert_objectid(item) for item in document]
    if isinstance(document, dict):
        return {key: convert_objectid(value) for key, value in document.items()}
    if isinstance(document, ObjectId):
        return str(document)
    return document
