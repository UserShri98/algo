from flask import Blueprint, jsonify
from data.brokers_data import brokers_data

brokers_bp = Blueprint("brokers", __name__)

@brokers_bp.route("/api/brokers", methods=["GET"])
def get_brokers():
    return jsonify(brokers_data)
