import { useEffect, useState } from "react";
import { getLivePositions, closePosition } from "../api/api";
import { Activity, X, TrendingUp, TrendingDown } from "lucide-react";

export default function LivePositions() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getLivePositions().then((data) => {
      setPositions(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const closeTrade = async (symbol) => {
    if (window.confirm(`Are you sure you want to close position for ${symbol}?`)) {
      await closePosition(symbol);
      load();
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <Activity className="text-emerald-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Live Positions</h2>
            <p className="text-xs sm:text-sm text-gray-500">{positions.length} active positions</p>
          </div>
        </div>
        <button
          onClick={load}
          className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all w-full sm:w-auto"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-pulse text-gray-500">Loading positions...</div>
        </div>
      ) : positions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Activity className="mx-auto mb-3 text-gray-300" size={48} />
          <p>No live positions found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {positions.map((p, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all gap-3 sm:gap-4"
            >
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:flex-1">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  p.unrealized_pnl >= 0 ? 'bg-emerald-100' : 'bg-red-100'
                }`}>
                  {p.unrealized_pnl >= 0 ? (
                    <TrendingUp className="text-emerald-600" size={18} />
                  ) : (
                    <TrendingDown className="text-red-600" size={18} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-base sm:text-lg truncate">{p.symbol}</p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Qty: {p.quantity} | Buy: ₹{p.buy_price}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="text-left sm:text-right">
                  <p className={`text-lg sm:text-xl font-bold ${
                    p.unrealized_pnl >= 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {p.unrealized_pnl >= 0 ? '+' : ''}₹{p.unrealized_pnl}
                  </p>
                  <p className="text-xs text-gray-500">Unrealized P&L</p>
                </div>

                {p.sell_price === null && (
                  <button
                    onClick={() => closeTrade(p.symbol)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex-shrink-0"
                    title="Close Position"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}