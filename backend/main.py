import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.file_controller import router as file_router

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the file router
app.include_router(file_router)

if __name__ == '__main__':
    os.makedirs("uploads", exist_ok=True)  # Create the uploads directory if it doesn't exist
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
