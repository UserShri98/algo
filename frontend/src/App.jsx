import DashboardSummary from "./components/DashboardSummary";
import LivePositions from "./components/LivePositions";
import AddPosition from "./components/AddPosition";
import Brokers from "./components/Brokers";
import Strategies from "./components/Strategies";
import { LayoutDashboard, Activity, TrendingUp, Target, Link as LinkIcon, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white flex flex-col fixed h-screen z-40 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg"></div>
          </div>
          <div>
            <h1 className="font-bold text-lg">ALGODEALER</h1>
            <p className="text-xs text-indigo-200">TRADING PLATFORM</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2">
          <button 
            onClick={() => {
              setActiveTab('dashboard');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-white text-indigo-600 shadow-lg' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button 
            onClick={() => {
              setActiveTab('positions');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeTab === 'positions' 
                ? 'bg-white text-indigo-600 shadow-lg' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Activity size={20} />
            <span className="font-medium">Live Positions</span>
          </button>

          <button 
            onClick={() => {
              setActiveTab('add');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeTab === 'add' 
                ? 'bg-white text-indigo-600 shadow-lg' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <TrendingUp size={20} />
            <span className="font-medium">Add Position</span>
          </button>

          <button 
            onClick={() => {
              setActiveTab('strategies');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeTab === 'strategies' 
                ? 'bg-white text-indigo-600 shadow-lg' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Target size={20} />
            <span className="font-medium">Strategies</span>
          </button>

          <button 
            onClick={() => {
              setActiveTab('brokers');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeTab === 'brokers' 
                ? 'bg-white text-indigo-600 shadow-lg' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <LinkIcon size={20} />
            <span className="font-medium">Brokers</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 w-full">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 lg:py-5 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="ml-12 lg:ml-0">
              <p className="text-xs sm:text-sm text-gray-500">Welcome back,</p>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Trading Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-md text-xs sm:text-sm">
                📊 Live
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <>
              <DashboardSummary />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <LivePositions />
                <div className="space-y-6 lg:space-y-8">
                  <Strategies />
                  <Brokers />
                </div>
              </div>
            </>
          )}

          {activeTab === 'positions' && <LivePositions />}
          {activeTab === 'add' && <AddPosition />}
          {activeTab === 'strategies' && <Strategies />}
          {activeTab === 'brokers' && <Brokers />}
        </main>
      </div>
    </div>
  );
}

export default App;