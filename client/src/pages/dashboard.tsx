import { Activity, Server, Cpu, Clock, HardDrive, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">{t("dashboard.title")}</h1>
        <p className="text-slate-400 text-sm mt-1">{t("dashboard.subtitle")}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t("dashboard.engineUsage")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: t("dashboard.totalProcesses"), value: "3", icon: Activity },
            { label: t("dashboard.totalMemory"), value: "545 MiB", icon: HardDrive },
            { label: t("dashboard.averageCpu"), value: "2.6%", icon: Cpu },
            { label: t("dashboard.heaviestProcess"), value: "Jobs-0", icon: Shield },
          ].map((stat, i) => (
            <div key={i} className="bg-[#151822] border border-white/5 rounded-xl p-5 flex items-center justify-between hover:bg-white/2 transition-colors">
              <div>
                <div className="text-xs font-medium text-slate-400 mb-1">{stat.label}</div>
                <div className="text-xl font-bold text-slate-200">{stat.value}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t("dashboard.processDetails")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "REST API-0", sub: "0% / 191.87 MiB", icon: Server, color: "text-cyan-400", bg: "bg-cyan-400/10" },
            { label: "Scheduler-0", sub: "2.6% / 171.69 MiB", icon: Clock, color: "text-emerald-400", bg: "bg-emerald-400/10" },
            { label: "Jobs-0", sub: "5.1% / 181.55 MiB", icon: Activity, color: "text-amber-400", bg: "bg-amber-400/10" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#151822] border border-white/5 rounded-xl p-5 flex items-center gap-4 hover:bg-white/2 transition-colors">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-200">{stat.label}</div>
                <div className="text-xs font-medium text-slate-500 mt-1">{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t("dashboard.historicalDataCache")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-[#151822] border border-white/5 rounded-xl p-6 hover:bg-white/2 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm font-medium text-slate-400 mb-2">{t("dashboard.todaysDataPull")}</div>
                  <div className="text-3xl font-bold text-rose-400 tracking-tight">103.65 <span className="text-xl font-semibold text-rose-400/70">{t("dashboard.gib")}</span></div>
                  <div className="text-xs text-rose-400/70 mt-2 flex items-center gap-1">
                    <span className="text-rose-400">↓ -40.17 {t("dashboard.gib")}</span> {t("dashboard.vsYesterday")}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-rose-400/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-rose-400" />
                </div>
              </div>
           </div>
           <div className="bg-[#151822] border border-white/5 rounded-xl p-6 hover:bg-white/2 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm font-medium text-slate-400 mb-2">{t("dashboard.last7Days")}</div>
                  <div className="text-3xl font-bold text-emerald-400 tracking-tight">835.03 <span className="text-xl font-semibold text-emerald-400/70">{t("dashboard.gib")}</span></div>
                  <div className="text-xs text-emerald-400/70 mt-2 flex items-center gap-1">
                    <span className="text-emerald-400">↑ +68.20 {t("dashboard.gib")}</span> {t("dashboard.vsLastWeek")}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
