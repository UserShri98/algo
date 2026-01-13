from flask import Blueprint, jsonify
from data.strategies_data import strategies_data

strategies_bp = Blueprint("strategies", __name__)

@strategies_bp.route("/api/strategies", methods=["GET"])
def get_strategies():
    return jsonify(strategies_data)
