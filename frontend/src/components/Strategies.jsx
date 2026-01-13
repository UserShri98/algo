import { useEffect, useState } from "react";
import { getStrategies } from "../api/api";
import { Target, Shield, AlertTriangle } from "lucide-react";

export default function Strategies() {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStrategies().then((data) => {
      setStrategies(data);
      setLoading(false);
    });
  }, []);

  const getRiskColor = (risk) => {
    const riskLower = risk.toLowerCase();
    if (riskLower === 'low') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (riskLower === 'medium') {
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    } else if (riskLower === 'high') {
      return 'bg-red-50 text-red-700 border-red-200';
    } else {
      return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRiskIcon = (risk) => {
    const riskLower = risk.toLowerCase();
    if (riskLower === 'low') {
      return <Shield className="text-emerald-500" size={16} />;
    } else if (riskLower === 'medium') {
      return <AlertTriangle className="text-yellow-500" size={16} />;
    } else {
      return <AlertTriangle className="text-red-500" size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm mb-6 sm:mb-8">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Target className="text-indigo-600" size={20} />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Strategies</h2>
          <p className="text-xs sm:text-sm text-gray-500">{strategies.length} trading strategies</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-pulse text-gray-500">Loading strategies...</div>
        </div>
      ) : strategies.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Target className="mx-auto mb-3 text-gray-300" size={48} />
          <p>No strategies found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {strategies.map((s, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-indigo-200"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="text-white sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm sm:text-base">{s.name}</p>
                    <p className="text-xs text-gray-500">Active Strategy</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 sm:mt-4">
                {getRiskIcon(s.risk)}
                <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(s.risk)}`}>
                  {s.risk} Risk
                </span>
              </div>

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Status</span>
                  <span className="font-medium text-emerald-600">Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}