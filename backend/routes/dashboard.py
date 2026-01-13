from flask import Blueprint, jsonify, request
from data.dashboard_data import dashboard_data
from data.live_positions_data import live_positions_data

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/api/dashboard/summary", methods=["GET"])
def dashboard_summary():
    return jsonify(dashboard_data)


@dashboard_bp.route("/api/dashboard/live-positions", methods=["GET"])
def get_live_positions():
    return jsonify(live_positions_data)


@dashboard_bp.route("/api/dashboard/live-positions", methods=["POST"])
def add_live_position():
    data = request.json

    required_fields = ["broker", "strategy", "symbol", "quantity", "buy_price"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    position = {
        "broker": data["broker"],
        "strategy": data["strategy"],
        "symbol": data["symbol"],
        "quantity": data["quantity"],
        "buy_price": data["buy_price"],
        "sell_price": None,
        "unrealized_pnl": 0,
        "realized_pnl": 0
    }

    live_positions_data.append(position)

    dashboard_data["total_orders"] += 1

    return jsonify({
        "message": "Position added successfully",
        "position": position
    }), 201


@dashboard_bp.route("/api/dashboard/live-positions/<symbol>/close", methods=["PUT"])
def close_position(symbol):
    for position in live_positions_data:
        if position["symbol"] == symbol:
            position["sell_price"] = position["buy_price"] + 100
            position["realized_pnl"] = 100 * position["quantity"]
            position["unrealized_pnl"] = 0

            dashboard_data["total_profit_loss"] += position["realized_pnl"]

            return jsonify({
                "message": "Position closed",
                "position": position
            })

    return jsonify({"error": "Position not found"}), 404
