import { useState } from "react";
import { addLivePosition } from "../api/api";
import { PlusCircle, TrendingUp } from "lucide-react";

export default function AddPosition() {
  const [form, setForm] = useState({
    broker: "",
    strategy: "",
    symbol: "",
    quantity: "",
    buy_price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      await addLivePosition({
        ...form,
        quantity: Number(form.quantity),
        buy_price: Number(form.buy_price),
      });

      alert("Position added successfully!");
      
      // Reset form
      setForm({
        broker: "",
        strategy: "",
        symbol: "",
        quantity: "",
        buy_price: "",
      });
    } catch (error) {
      alert("Error adding position");
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm mb-6 sm:mb-8">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
          <PlusCircle className="text-indigo-600 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Add Position</h2>
          <p className="text-xs sm:text-sm text-gray-500">Create a new trading position</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Broker
          </label>
          <input
            name="broker"
            placeholder="Enter broker name"
            onChange={handleChange}
            value={form.broker}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Strategy
          </label>
          <input
            name="strategy"
            placeholder="Enter strategy name"
            onChange={handleChange}
            value={form.strategy}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Symbol
          </label>
          <input
            name="symbol"
            placeholder="e.g., AAPL, TSLA"
            onChange={handleChange}
            value={form.symbol}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            name="quantity"
            type="number"
            placeholder="Enter quantity"
            onChange={handleChange}
            value={form.quantity}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Buy Price
          </label>
          <input
            name="buy_price"
            type="number"
            step="0.01"
            placeholder="Enter buy price"
            onChange={handleChange}
            value={form.buy_price}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <button
        onClick={submit}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        <TrendingUp size={18} className="sm:w-5 sm:h-5" />
        Add Position
      </button>
    </div>
  );
}