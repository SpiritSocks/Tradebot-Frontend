import { Link, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, Users, PlusCircle, History, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const currentPath = location.pathname;

  const navGroups = [
    {
      title: t("nav.overview"),
      items: [
        { href: "/", label: t("nav.dashboard"), icon: LayoutDashboard },
        { href: "/runs", label: t("nav.historicalAnalysis"), icon: History },
      ]
    },
    {
      title: t("nav.admin"),
      items: [
        { href: "/admin/invitations", label: t("nav.invitations"), icon: Users },
      ]
    }
  ];

  return (
    <div className="w-64 h-screen bg-[#0b0e14] border-r border-white/5 flex-col hidden md:flex flex-shrink-0">
      <div className="p-6 flex items-center gap-3 text-cyan-400 font-bold text-xl tracking-wide border-b border-white/5 h-16 box-border">
        <Activity className="w-6 h-6" />
        {t("brand.name")}
      </div>
      <div className="flex-1 overflow-y-auto py-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="mb-8">
            <div className="px-6 mb-3 text-xs font-semibold text-slate-500 tracking-wider">
              {group.title}
            </div>
            <div className="space-y-1 px-3">
              {group.items.map((item) => {
                const isActive = currentPath === item.href || (currentPath.startsWith(item.href) && item.href !== "/" && item.href !== "/runs");

                // Extra check for /runs vs /runs/new
                const isExactActive = currentPath === item.href;

                return (
                  <Link key={item.href} to={item.href}>
                    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group ${
                      isExactActive || (isActive && item.href !== "/runs")
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}>
                      <item.icon className={`w-5 h-5 ${isExactActive || (isActive && item.href !== "/runs") ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
