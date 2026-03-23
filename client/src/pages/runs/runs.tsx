import { Link } from "react-router-dom";
import { Play, CheckCircle2, Clock, AlertCircle, Plus, History, Loader2 } from "lucide-react";
import { useState } from "react";
import { useListRuns } from "@/lib/api-client";
import { useTranslation } from "react-i18next";

const StatusBadge = ({ status }: { status: string }) => {
  const { t } = useTranslation();
  switch (status) {
    case 'done': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 className="w-3.5 h-3.5"/> {t("runs.statusDone")}</span>;
    case 'running': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"><Play className="w-3.5 h-3.5 animate-pulse"/> {t("runs.statusRunning")}</span>;
    case 'failed': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20"><AlertCircle className="w-3.5 h-3.5"/> {t("runs.statusFailed")}</span>;
    default: return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20"><Clock className="w-3.5 h-3.5"/> {t("runs.statusQueued")}</span>;
  }
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "\u2014";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const RunsList = () => {
  const { t } = useTranslation();
  const [beforeId, setBeforeId] = useState<number | undefined>(undefined);
  const { data, isLoading, isError } = useListRuns({ limit: 20, before_id: beforeId });

  const runs = data?.items ?? [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t("runs.title")}</h1>
          <p className="text-slate-400 text-sm mt-1">{t("runs.subtitle")}</p>
        </div>
        <Link to="/runs/new" className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#0f1117] font-semibold px-4 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(34,211,238,0.25)]">
          <Plus className="w-5 h-5" />
          {t("runs.newRun")}
        </Link>
      </div>

      <div className="bg-[#151822] border border-white/5 rounded-xl overflow-hidden shadow-xl shadow-black/20">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-20 text-rose-400">
            {t("runs.failedToLoad")}
          </div>
        ) : runs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <History className="w-10 h-10 mb-3 text-slate-600" />
            <p>{t("runs.noRuns")}</p>
            <Link to="/runs/new" className="text-cyan-500 hover:text-cyan-400 text-sm mt-2">{t("runs.startFirst")}</Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-[#1a1e2b] border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">{t("runs.runId")}</th>
                    <th className="px-6 py-4 font-semibold">{t("runs.market")}</th>
                    <th className="px-6 py-4 font-semibold">{t("runs.detector")}</th>
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">{t("runs.interval")}</th>
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">{t("runs.period")}</th>
                    <th className="px-6 py-4 font-semibold">{t("runs.signals")}</th>
                    <th className="px-6 py-4 font-semibold">{t("runs.avgProfit")}</th>
                    <th className="px-6 py-4 font-semibold whitespace-nowrap">{t("runs.created")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {runs.map((run) => (
                    <tr key={run.id} className="hover:bg-white/2 transition-colors group">
                      <td className="px-6 py-4 font-mono text-cyan-400/80 text-xs">{run.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-200">{run.market?.symbol}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{run.market?.exchange} · {run.market?.category}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{run.detector?.code}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono text-xs">{run.interval}</span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {formatDate(run.from_time)} — {formatDate(run.to_time)}
                      </td>
                      <td className="px-6 py-4 text-slate-300">{run.signals_count ?? "\u2014"}</td>
                      <td className="px-6 py-4 font-medium text-emerald-400">
                        {run.avg_profit != null ? `${(run.avg_profit * 100).toFixed(2)}%` : "\u2014"}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">{formatDate(run.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data?.has_more && data.next_before_id != null && (
              <div className="flex justify-center py-4 border-t border-white/5">
                <button
                  onClick={() => setBeforeId(data.next_before_id!)}
                  className="text-cyan-500 hover:text-cyan-400 text-sm font-medium"
                >
                  {t("common.loadMore")}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RunsList;
