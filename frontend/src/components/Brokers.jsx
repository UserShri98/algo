import { useEffect, useState } from "react";
import { getBrokers } from "../api/api";
import { Link as LinkIcon, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function Brokers() {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBrokers().then((data) => {
      setBrokers(data);
      setLoading(false);
    });
  }, []);

  const getStatusIcon = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'connected' || statusLower === 'active') {
      return <CheckCircle className="text-emerald-500" size={18} />;
    } else if (statusLower === 'disconnected' || statusLower === 'inactive') {
      return <XCircle className="text-red-500" size={18} />;
    } else {
      return <AlertCircle className="text-yellow-500" size={18} />;
    }
  };

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'connected' || statusLower === 'active') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (statusLower === 'disconnected' || statusLower === 'inactive') {
      return 'bg-red-50 text-red-700 border-red-200';
    } else {
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm mb-6 sm:mb-8">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
          <LinkIcon className="text-purple-600" size={20} />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Brokers</h2>
          <p className="text-xs sm:text-sm text-gray-500">Connected broker accounts</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-pulse text-gray-500">Loading brokers...</div>
        </div>
      ) : brokers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <LinkIcon className="mx-auto mb-3 text-gray-300" size={48} />
          <p>No brokers connected</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {brokers.map((b, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LinkIcon className="text-indigo-600 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm sm:text-base">{b.name}</p>
                    <p className="text-xs text-gray-500">Broker Account</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {getStatusIcon(b.status)}
                </div>
              </div>

              <div className="mt-3">
                <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(b.status)}`}>
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}