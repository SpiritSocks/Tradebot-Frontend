import { Bell, Search, User, Menu, LogOut, Globe } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useLogout } from "@/lib/api-client";
import { useTranslation } from "react-i18next";

export function TopBar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const logoutMutation = useLogout();
  const currentPath = location.pathname;

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        logout();
        navigate("/");
      }
    });
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  const getBreadcrumbs = () => {
    if (currentPath === "/dashboard") return t("nav.dashboard");
    if (currentPath === "/runs") return t("nav.historicalAnalysis");
    if (currentPath === "/runs/new") return t("nav.newRun");
    if (currentPath === "/admin/invitations") return t("nav.adminInvitations");
    return currentPath.substring(1).replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="h-16 border-b border-white/5 bg-[#0f1117]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10 flex-shrink-0">
      <div className="flex items-center gap-4 text-sm text-slate-400">
        <button className="md:hidden text-slate-400 hover:text-white">
          <Menu className="w-5 h-5" />
        </button>
        <span className="hidden md:inline-block">{t("nav.home")}</span>
        <span className="hidden md:inline-block text-slate-600">/</span>
        <span className="text-slate-200 font-medium">{getBreadcrumbs()}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder={t("common.search")}
            className="bg-[#151822] border border-white/5 rounded-full pl-9 pr-4 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors w-64"
          />
        </div>

        <button
          onClick={toggleLanguage}
          className="p-2 rounded-full hover:bg-white/5 text-slate-400 transition-colors flex items-center gap-1.5"
          title={i18n.language === "ru" ? "Switch to English" : "Переключить на русский"}
        >
          <Globe className="w-4 h-4" />
          <span className="text-xs font-medium uppercase">{i18n.language}</span>
        </button>

        <button className="p-2 rounded-full hover:bg-white/5 text-slate-400 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-white/10 mx-2"></div>

        <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow">
          <User className="w-4 h-4" />
        </button>

        <button
          onClick={handleLogout}
          className="ml-2 p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-rose-400 transition-colors"
          title={t("common.logout")}
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
