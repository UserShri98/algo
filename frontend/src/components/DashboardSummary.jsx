import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/api";
import { ShoppingCart, TrendingUp, Wallet, Link as LinkIcon } from "lucide-react";

export default function DashboardSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getDashboardSummary().then(setSummary);
  }, []);

  if (!summary) return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-pulse text-gray-500">Loading summary...</div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Total Orders Card */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs sm:text-sm text-gray-500">Total Orders</p>
          <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg">
            <ShoppingCart size={16} className="sm:w-5 sm:h-5" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{summary.total_orders}</h2>
        <div className="mt-3 sm:mt-4 flex gap-1">
          <div className="w-2 h-8 sm:h-12 bg-gray-100 rounded"></div>
          <div className="w-2 h-8 sm:h-12 bg-gray-100 rounded"></div>
          <div className="w-2 h-8 sm:h-12 bg-indigo-600 rounded"></div>
          <div className="w-2 h-8 sm:h-12 bg-gray-100 rounded"></div>
        </div>
      </div>

      {/* Profit/Loss Card */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs sm:text-sm text-gray-500">Total P&L</p>
          <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg">
            <TrendingUp size={16} className="sm:w-5 sm:h-5" />
          </div>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold ${
          summary.total_profit_loss >= 0 ? 'text-emerald-600' : 'text-red-600'
        }`}>
          ₹{summary.total_profit_loss}
        </h2>
        <div className="mt-3 sm:mt-4 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            summary.total_profit_loss >= 0 ? 'bg-emerald-500' : 'bg-red-500'
          }`}></div>
          <span className={`text-xs sm:text-sm font-medium ${
            summary.total_profit_loss >= 0 ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {summary.total_profit_loss >= 0 ? 'Profit' : 'Loss'}
          </span>
        </div>
      </div>

      {/* Account Balance Card */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs sm:text-sm text-gray-500">Account Balance</p>
          <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
            <Wallet size={16} className="sm:w-5 sm:h-5" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">₹{summary.account_balance}</h2>
        <div className="mt-3 sm:mt-4 h-6 sm:h-8 relative">
          <svg className="w-full h-full" viewBox="0 0 100 30">
            <path d="M 0,15 Q 20,10 40,12 T 80,8 L 100,10" fill="none" stroke="#c4b5fd" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* Broker Status Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <LinkIcon size={16} className="sm:w-5 sm:h-5" />
          <p className="text-xs sm:text-sm text-indigo-100">Broker Status</p>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">{summary.broker_status}</h2>
        <div className="h-8 sm:h-10 relative mt-2 sm:mt-3">
          <svg className="w-full h-full" viewBox="0 0 100 30">
            <path d="M 0,20 Q 25,15 50,10 T 100,5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
            <path d="M 0,20 Q 25,15 50,10 T 100,5 L 100,30 L 0,30 Z" fill="rgba(255,255,255,0.2)"/>
          </svg>
        </div>
      </div>
    </div>
  );
}