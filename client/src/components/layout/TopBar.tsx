import { Bell, Search, User, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

export function TopBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const getBreadcrumbs = () => {
    if (currentPath === "/") return "Dashboard";
    if (currentPath === "/runs") return "Historical Analysis";
    if (currentPath === "/runs/new") return "Historical Analysis / New Run";
    if (currentPath === "/admin/invitations") return "Admin / Invitations";
    return currentPath.substring(1).replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="h-16 border-b border-white/5 bg-[#0f1117]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10 flex-shrink-0">
      <div className="flex items-center gap-4 text-sm text-slate-400">
        <button className="md:hidden text-slate-400 hover:text-white">
          <Menu className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center gap-4">        
        <button className="p-2 rounded-full hover:bg-white/5 text-slate-400 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full"></span>
        </button>
        
        <div className="h-8 w-px bg-white/10 mx-2"></div>

        <button className="w-8 h-8 rounded-full bg-linear-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow">
          <User className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
