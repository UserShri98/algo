from flask import Flask, jsonify
from flask_cors import CORS
from config import Config

from routes.dashboard import dashboard_bp
from routes.brokers import brokers_bp
from routes.strategies import strategies_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ✅ Root route (fixes 404)
@app.route("/")
def home():
    return jsonify({
        "status": "Backend is running",
        "message": "Flask server is live on port 2000"
    })

# Register blueprints
app.register_blueprint(dashboard_bp)
app.register_blueprint(brokers_bp)
app.register_blueprint(strategies_bp)

if __name__ == "__main__":
    app.run(host=Config.HOST, port=Config.PORT)
