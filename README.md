# Files Storage Python

## Overview

This project allows user to upload files (pdf or docx), extracts and the content of those files in MongoDB database and download the stored content as a pdf or docx file. It includes a backend API built using FastAPI and a frontend application built with React.

## Directory Structure

- **backend**

  - controllers
  - fonts
  - models
  - services
  - utils
  - main.py
  - requirements.txt

- **frontend**

  - public
  - src
  - .gitignore
  - package.json

- .gitignore

## Setup Instructions

- Clone the repository

  ```sh
  https://github.com/Ranish-Shrestha/Files_Storage_Python.git
  ```

### Backend

- Change directory to backend project

  ```sh
  cd backend
  ```

- Install dependencies

  ```sh
  pip install -r requirements.txt
  ```

- Start the backend server

  ```sh
  uvicorn main:app --reload
  ```

### Frontend

- Open new cmd prompt and change directory to frontend project

  ```sh
  cd frontend
  ```

- Install dependencies:

  ```sh
  npm install
  ```

- Start the frontend server:

  ```sh
  npm start
  ```

## API Documentation

### Upload File(s)

- **Endpoint**: `/upload`
- **Method**: POST
- **Description**: Uploads a PDF or DOCX file.
- **Request Body** (FormData):
  ```sh
    curl -X POST "http://localhost:8000/upload" \
    -H "Content-Type: multipart/form-data" \
    -F "files=@path/to/file1.pdf" \
    -F "files=@path/to/file2.docx" \
    -F "files=@path/to/file3.pdf" \
    -F "files=@path/to/file4.docx"
    -F "files=@path/to/file3.pdf" \
  ```
- **Response**:

  - For `200 ok`:

    ```json
    [
      {
        "filename": "file1.docx",
        "status": "File content stored"
      },
      {
        "filename": "file2.docx",
        "status": "File content stored"
      },
      {
        "filename": "file3.pdf",
        "status": "File content stored"
      },
      {
        "filename": "file4.docx",
        "status": "File content stored"
      },
      {
        "filename": "file5.pdf",
        "status": "File content stored"
      }
    ]
    ```

    ![File content stored](images/File_content_stored.png)

  - For `415 Unsupported media type`:

    ```json
    [
      {
        "filename": "file6.xlsx",
        "status": "Unsupported file type",
        "status_code": 415
      },
      {
        "filename": "file7.docx",
        "status": "File content stored",
        "status_code": 200
      },
      {
        "filename": "file8.txt",
        "status": "Unsupported file type",
        "status_code": 415
      }
    ]
    ```

    ![Unsupported file type](images/Unsupported_file_type.png)

### Get All Files

- **Endpoint**: `/files`
- **Method**: GET
- **Description**: Gets the list of file details stored in database.
- **Response**:

  ```json
  [
    {
      "_id": "674fe2299ecf2bc7089d0f7d",
      "filename": "file1",
      "file_extension": ".docx",
      "file_size": 22110,
      "download_count": 1
    },
    {
      "_id": "674fe2299ecf2bc7089d0f7f",
      "filename": "file2",
      "file_extension": ".docx",
      "file_size": 17066,
      "download_count": 2
    },
    {
      "_id": "674fe2299ecf2bc7089d0f81",
      "filename": "file3",
      "file_extension": ".pdf",
      "file_size": 78390,
      "download_count": 0
    },
    {
      "_id": "674fe2299ecf2bc7089d0f83",
      "filename": "file4",
      "file_extension": ".docx",
      "file_size": 23674,
      "download_count": 1
    },
    {
      "_id": "674fe2299ecf2bc7089d0f85",
      "filename": "file5",
      "file_extension": ".pdf",
      "file_size": 141328,
      "download_count": 0
    }
  ]
  ```

  ![Files](images/Files.png)

### Download File

- **Endpoint**: `/download/{file_id}/{file_type}`
- **Method**: GET
- **Description**: Downloads the specified file as either PDF or DOCX.
- **Path Parameters**:
  - `file_id`: The ID of the file to download.
  - `file_type`: The type of file to download (`pdf` or `docx`).
- **Response**: Binary stream of the file.

### Get All File Logs

- **Endpoint**: `/activity_logs`
- **Method**: GET
- **Description**: Gets the list of file logs stored in database.
- **Response**:

  ```json
  [
    {
      "_id": "674fe400df3f32fbffdcba17",
      "action": "upload",
      "details": {
        "filename": "file1",
        "file_type": "docx"
      },
      "timestamp": "2024-12-04T00:09:20.944000"
    },
    {
      "_id": "674fe400df3f32fbffdcba19",
      "action": "upload",
      "details": {
        "filename": "file2",
        "file_type": "docx"
      },
      "timestamp": "2024-12-04T00:09:20.959000"
    },
    {
      "_id": "674fe401df3f32fbffdcba1b",
      "action": "upload",
      "details": {
        "filename": "file3",
        "file_type": "pdf"
      },
      "timestamp": "2024-12-04T00:09:21.143000"
    },
    {
      "_id": "674fe401df3f32fbffdcba1d",
      "action": "upload",
      "details": {
        "filename": "file4",
        "file_type": "docx"
      },
      "timestamp": "2024-12-04T00:09:21.158000"
    },
    {
      "_id": "674fe401df3f32fbffdcba1f",
      "action": "upload",
      "details": {
        "filename": "file5",
        "file_type": "pdf"
      },
      "timestamp": "2024-12-04T00:09:21.447000"
    },
    {
      "_id": "674fe40bdf3f32fbffdcba20",
      "action": "download",
      "details": {
        "filename": "file1",
        "file_type": "pdf"
      },
      "timestamp": "2024-12-04T00:09:31.114000"
    },
    {
      "_id": "674fe40edf3f32fbffdcba21",
      "action": "download",
      "details": {
        "filename": "file2",
        "file_type": "docx"
      },
      "timestamp": "2024-12-04T00:09:34.328000"
    },
    {
      "_id": "674fe412df3f32fbffdcba22",
      "action": "download",
      "details": {
        "filename": "file4",
        "file_type": "pdf"
      },
      "timestamp": "2024-12-04T00:09:38.129000"
    },
    {
      "_id": "674fe416df3f32fbffdcba23",
      "action": "download",
      "details": {
        "filename": "file1",
        "file_type": "docx"
      },
      "timestamp": "2024-12-04T00:09:42.171000"
    },
    {
      "_id": "674fe419df3f32fbffdcba24",
      "action": "download",
      "details": {
        "filename": "file5",
        "file_type": "docx"
      },
      "timestamp": "2024-12-04T00:09:45.264000"
    },
    {
      "_id": "674fe41cdf3f32fbffdcba25",
      "action": "download",
      "details": {
        "filename": "file1",
        "file_type": "docx"
      },
      "timestamp": "2024-12-04T00:09:48.366000"
    },
    {
      "_id": "674fe420df3f32fbffdcba26",
      "action": "download",
      "details": {
        "filename": "file4",
        "file_type": "pdf"
      },
      "timestamp": "2024-12-04T00:09:52.841000"
    }
  ]
  ```

  ![Activity Logs](images/Activity_Logs.png)
