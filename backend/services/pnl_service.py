def calculate_pnl(position):
    if position["sell_price"] is None:
        return position["unrealized_pnl"]

    return (position["sell_price"] - position["buy_price"]) * position["quantity"]
