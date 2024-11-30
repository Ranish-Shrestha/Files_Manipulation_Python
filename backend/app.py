
from flask import Flask
from flask_cors import CORS
from controllers.file_controller import file_blueprint

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Register the blueprint for file-related routes
app.register_blueprint(file_blueprint)

if __name__ == '__main__':
    import os
    os.makedirs("uploads", exist_ok=True)
    app.run(debug=True)
