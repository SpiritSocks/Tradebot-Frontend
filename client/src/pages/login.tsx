import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useLogin } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginMutation.mutateAsync({ email, password });
      if (data?.access_token && data?.refresh_token) {
        login(data.access_token, data.refresh_token);
        toast({ title: t("auth.loginSuccess") });
        navigate("/dashboard");
      } else {
        toast({ title: t("auth.loginFailed"), description: t("auth.noTokens") });
      }
    } catch (error) {
      toast({ title: t("auth.loginFailed"), description: String(error) });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#151822]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl
      srelative z-10 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center gap-3 text-cyan-400 font-bold text-2xl tracking-wide mb-8">
            <Activity className="w-8 h-8" />
            {t("brand.name")}
          </div>

          <h1 className="text-xl font-semibold text-white mb-2 text-center">{t("auth.welcomeBack")}</h1>
          <p className="text-slate-400 text-sm text-center mb-8">{t("auth.signInDescription")}</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">{t("auth.emailLabel")}</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder={t("auth.emailPlaceholder")}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#0b0e14] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none
                   focus:border-cyan-500/50 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-slate-300">{t("auth.passwordLabel")}</label>
                <a href="#" className="text-xs text-cyan-500 hover:text-cyan-400">{t("auth.forgotPassword")}</a>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder={t("auth.passwordPlaceholder")}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none
                  focus:border-cyan-500/50 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400
              hover:to-blue-500 text-white font-semibold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] mt-4
              disabled:opacity-50"
            >
              {loginMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{t("common.signIn")} <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            {t("auth.needAccount")} <a href="/signup" className="text-cyan-500 hover:text-cyan-400 transition-colors">{t("auth.useInvitationCode")}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
