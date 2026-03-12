import { useState } from "react";
import { Plus, Trash2, ArrowRight, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewRun() {
  const navigate = useNavigate();
  const [detectors, setDetectors] = useState([{ id: 1, code: "MA_CROSS", label: "Moving Average" }]);
  const [feesEnabled, setFeesEnabled] = useState(false);

  const addDetector = () => setDetectors([...detectors, { id: Date.now(), code: "", label: "" }]);
  const removeDetector = (id: number) => setDetectors(detectors.filter(d => d.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/runs");
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Configure New Run</h1>
        <p className="text-slate-400 text-sm mt-1">Set up parameters for historical data analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Market Section */}
        <div className="bg-[#151822] border border-white/5 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white flex items-center gap-3 mb-6">
            <span className="w-7 h-7 rounded-md bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs border border-cyan-500/20">1</span>
            Market Selection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Exchange</label>
              <select className="w-full bg-[#0b0e14] border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50 appearance-none">
                <option value="bybit">Bybit</option>
                <option value="binance">Binance</option>
                <option value="okx">OKX</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Category</label>
              <select className="w-full bg-[#0b0e14] border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50 appearance-none">
                <option value="linear">Linear</option>
                <option value="spot">Spot</option>
                <option value="inverse">Inverse</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Symbol</label>
              <input 
                type="text" 
                placeholder="e.g. BTCUSDT" 
                defaultValue="BTCUSDT"
                className="w-full bg-[#0b0e14] border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50 placeholder:text-slate-600" 
              />
            </div>
          </div>
        </div>

        {/* Data Parameters */}
        <div className="bg-[#151822] border border-white/5 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white flex items-center gap-3 mb-6">
            <span className="w-7 h-7 rounded-md bg-purple-500/10 text-purple-400 flex items-center justify-center text-xs border border-purple-500/20">2</span>
            Data Parameters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Interval</label>
              <select className="w-full bg-[#0b0e14] border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-purple-500/50 appearance-none">
                <option value="1">1m</option>
                <option value="5">5m</option>
                <option value="15">15m</option>
                <option value="60">1h</option>
                <option value="D">1d</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Price Type</label>
              <select className="w-full bg-[#0b0e14] border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-purple-500/50 appearance-none">
                <option value="0">Close</option>
                <option value="1">Open</option>
                <option value="2">High</option>
                <option value="3">Low</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">From Date</label>
              <input 
                type="datetime-local" 
                defaultValue="2026-01-01T00:00"
                className="w-full bg-[#0b0e14] border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-purple-500/50 [color-scheme:dark]" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">To Date</label>
              <input 
                type="datetime-local" 
                defaultValue="2026-02-01T00:00"
                className="w-full bg-[#0b0e14] border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-purple-500/50 [color-scheme:dark]" 
              />
            </div>
          </div>
        </div>

        {/* Detectors */}
        <div className="bg-[#151822] border border-white/5 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-3">
              <span className="w-7 h-7 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs border border-amber-500/20">3</span>
              Detectors
            </h2>
          </div>
          
          <div className="space-y-4">
            {detectors.map((detector, index) => (
              <div key={detector.id} className="p-5 rounded-xl border border-white/5 bg-[#0b0e14]/50 relative group">
                {detectors.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeDetector(detector.id)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity bg-white/5 p-1.5 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 pr-8">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-400">Detector Code</label>
                    <select className="w-full bg-[#151822] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50 appearance-none">
                      <option value="MA_CROSS">Moving Average Cross</option>
                      <option value="RSI">RSI Divergence</option>
                      <option value="BOLLINGER">Bollinger Bands Breakout</option>
                      <option value="CUSTOM_W">Custom Window (W)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-400">Label (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. primary_ma" 
                      className="w-full bg-[#151822] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50 placeholder:text-slate-600" 
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-[#151822] rounded-lg border border-white/5">
                  <div className="flex items-center gap-2 mb-3 text-xs font-medium text-amber-400/80 uppercase tracking-wider">
                    <Settings2 className="w-3.5 h-3.5" /> Configuration Options
                  </div>
                  {/* Dynamic Form Mockup */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">Short Period</label>
                      <input type="number" defaultValue={9} className="w-full bg-[#0b0e14] border border-white/5 rounded-md px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">Long Period</label>
                      <input type="number" defaultValue={21} className="w-full bg-[#0b0e14] border border-white/5 rounded-md px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {detectors.length === 0 && (
              <div className="text-center py-8 text-slate-500 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                No detectors added. Add at least one detector to continue.
              </div>
            )}
          </div>
        </div>

        {/* Fees (Optional) */}
        <div className="bg-[#151822] border border-white/5 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Trading Fees</h2>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={feesEnabled} onChange={(e) => setFeesEnabled(e.target.checked)} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${feesEnabled ? 'bg-cyan-500' : 'bg-white/10'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${feesEnabled ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm font-medium text-slate-300">Enable custom fees</span>
            </label>
          </div>
          
          {feesEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 pt-6 border-t border-white/5 animate-in slide-in-from-top-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Maker Fee (%)</label>
                <input type="number" step="0.01" defaultValue="0.02" className="w-full bg-[#0b0e14] border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Taker Fee (%)</label>
                <input type="number" step="0.01" defaultValue="0.05" className="w-full bg-[#0b0e14] border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50" />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
            Start Analysis Run
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
