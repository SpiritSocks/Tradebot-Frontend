import { Link } from "react-router-dom";
import { Play, CheckCircle2, Clock, AlertCircle, Plus, Activity, History } from "lucide-react";
import { useState, useEffect } from "react";
import { getMockRuns } from "@/lib/mock-data";

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'done': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 className="w-3.5 h-3.5"/> Done</span>;
    case 'running': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"><Play className="w-3.5 h-3.5 animate-pulse"/> Running</span>;
    case 'failed': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20"><AlertCircle className="w-3.5 h-3.5"/> Failed</span>;
    default: return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20"><Clock className="w-3.5 h-3.5"/> Queued</span>;
  }
};

export default function RunsList() {
  const [runs, setRuns] = useState<any[]>([]);

  useEffect(() => {
    setRuns(getMockRuns());
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Historical Analysis</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and view your backtesting runs</p>
        </div>
        <Link to="/runs/new" className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#0f1117] font-semibold px-4 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(34,211,238,0.25)]">
          <Plus className="w-5 h-5" />
          New Run
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Runs", value: "24", icon: History, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Success Rate", value: "92%", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { label: "Avg. Duration", value: "4m 12s", icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10" },
          { label: "Active Nodes", value: "3 / 5", icon: Activity, color: "text-cyan-400", bg: "bg-cyan-400/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#151822] border border-white/5 rounded-xl p-5 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-400">{stat.label}</div>
              <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#151822] border border-white/5 rounded-xl overflow-hidden shadow-xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-[#1a1e2b] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Run ID</th>
                <th className="px-6 py-4 font-semibold">Market</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Interval & Period</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">PnL</th>
                <th className="px-6 py-4 font-semibold">Trades</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {runs.map((run) => (
                <tr key={run.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 font-mono text-cyan-400/80 text-xs">{run.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-200">{run.market?.split(' / ')[2] || run.market}</div>
                    {run.market?.includes(' / ') && (
                      <div className="text-xs text-slate-500 mt-0.5">{run.market.split(' / ')[0]} · {run.market.split(' / ')[1]}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono text-xs">{run.interval}</span>
                    </div>
                    <div className="text-xs text-slate-500">{run.period}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={run.status} />
                  </td>
                  <td className="px-6 py-4 font-medium text-emerald-400">{run.pnl}</td>
                  <td className="px-6 py-4 text-slate-300">{run.trades}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
