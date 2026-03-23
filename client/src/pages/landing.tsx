import { Link } from "react-router-dom";
import { Activity, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-cyan-500/10
      rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-8 animate-in
      fade-in zoom-in duration-700">
        <div className="flex items-center justify-center gap-3 text-cyan-400 font-bold text-4xl tracking-wide">
          <Activity className="w-12 h-12" />
          {t("brand.name")}
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          {t("landing.title1")} <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
            {t("landing.title2")}
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
          {t("landing.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link to="/login">
            <button className="flex items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]">
              {t("landing.cta")} <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <button className="px-8 py-3.5 rounded-xl font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            {t("landing.learnMore")}
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 text-slate-500 text-sm">
        {t("brand.copyright")}
      </div>
    </div>
  );
}
