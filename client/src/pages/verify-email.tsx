import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Activity, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useVerifyEmail } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export default function VerifyEmail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const verifyMutation = useVerifyEmail();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;
    verifyMutation.mutate(token, {
      onSuccess: () => {
        toast({ title: t("verify.emailVerified"), description: t("verify.youCanSignIn") });
        setTimeout(() => navigate("/login"), 2000);
      },
      onError: (error) => {
        toast({ title: t("verify.verificationFailed"), description: String(error.message) });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#151822]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
        <div className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 text-cyan-400 font-bold text-2xl tracking-wide mb-8">
            <Activity className="w-8 h-8" />
            {t("brand.name")}
          </div>

          {!token ? (
            <>
              <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h1 className="text-xl font-semibold text-white mb-2">{t("verify.invalidLink")}</h1>
              <p className="text-slate-400 text-sm mb-6">{t("verify.tokenMissing")}</p>
              <a href="/login" className="text-cyan-500 hover:text-cyan-400 text-sm">{t("common.goToSignIn")}</a>
            </>
          ) : verifyMutation.isPending ? (
            <>
              <Loader2 className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-spin" />
              <h1 className="text-xl font-semibold text-white mb-2">{t("verify.verifying")}</h1>
              <p className="text-slate-400 text-sm">{t("common.pleaseWait")}</p>
            </>
          ) : verifyMutation.isSuccess ? (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h1 className="text-xl font-semibold text-white mb-2">{t("verify.success")}</h1>
              <p className="text-slate-400 text-sm mb-6">{t("verify.redirecting")}</p>
            </>
          ) : verifyMutation.isError ? (
            <>
              <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h1 className="text-xl font-semibold text-white mb-2">{t("verify.failed")}</h1>
              <p className="text-slate-400 text-sm mb-6">{verifyMutation.error?.message}</p>
              <a href="/login" className="text-cyan-500 hover:text-cyan-400 text-sm">{t("common.goToSignIn")}</a>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
