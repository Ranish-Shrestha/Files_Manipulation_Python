from bson import ObjectId
from fastapi import HTTPException, UploadFile
from fastapi.responses import StreamingResponse
from models.file_model import file_collection, log_collection, file_schema, log_schema
from utils.json_utils import convert_objectid
from utils.file_utils import read_docx, read_pdf, generate_pdf, generate_docx

async def log_activity(action, details):
    log_collection.insert_one(log_schema(action, details))

async def upload_file_service(files: list[UploadFile]):
    responses = []

    for file in files:
        if file.filename == '':
            raise HTTPException(status_code=400, detail="File name is empty")

        # Manually handle filename and extension extraction
        filename_parts = file.filename.rsplit('.', 1)
        if len(filename_parts) != 2:
            raise HTTPException(status_code=400, detail="File must have an extension")
        
        filename_without_extension, file_extension = filename_parts

        if file_extension.lower() == 'pdf':
            text = await read_pdf(file)
        elif file_extension.lower() == 'docx':
            text = await read_docx(file)
        else:
            responses.append({"filename": filename_without_extension, "status": "Unsupported file type"})
            continue

        if not text.strip():
            raise HTTPException(status_code=400, detail="File content is empty")

        # Read file content into memory to get the exact size
        file.file.seek(0)
        content = file.file.read()
        file_size = len(content)

        file_record = file_schema(filename_without_extension, f".{file_extension}", file_size, text)
        file_collection.insert_one(file_record)
        await log_activity("upload", {"filename": filename_without_extension})
        responses.append({"filename": filename_without_extension, "status": "File uploaded and content stored"})

    return responses

async def get_files_service():
    files = list(file_collection.find({}, {'content': 0}))
    return convert_objectid(files)

async def download_file_service(file_id, file_type):
    file_record = file_collection.find_one({"_id": ObjectId(file_id)})
    if not file_record:
        raise HTTPException(status_code=404, detail="File not found")

    filename = file_record["filename"]
    content = file_record["content"]

    if file_type == "pdf":
        buffer = await generate_pdf(content)
        media_type = "application/pdf"
    elif file_type == "docx":
        buffer = await generate_docx(content)
        media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    file_collection.update_one({"_id": ObjectId(file_id)}, {"$inc": {"download_count": 1}})
    await log_activity("download", {"filename": file_record["filename"], "file_type": file_type})

    return StreamingResponse(buffer, media_type=media_type, headers={"Content-Disposition": f"attachment; filename={filename}.{file_type}"})

async def get_activity_log_service():
    logs = list(log_collection.find())
    return convert_objectid(logs)
