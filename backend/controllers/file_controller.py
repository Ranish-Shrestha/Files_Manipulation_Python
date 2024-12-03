from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from services.file_service import (
    upload_file_service,
    get_files_service,
    download_file_service,
    get_activity_log_service,
)

router = APIRouter()

@router.post("/upload")
async def upload_file(files: List[UploadFile] = File(...)):
    try:
        return await upload_file_service(files)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/files")
async def get_files():
    try:
        return await get_files_service()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/download/{file_id}/{file_type}")
async def download_file(file_id: str, file_type: str):
    try:
        return await download_file_service(file_id, file_type)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/activity_logs")
async def get_activity_logs():
    try:
        return await get_activity_log_service()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
