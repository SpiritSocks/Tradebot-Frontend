import { useState } from "react";
import { Copy, Plus, Users, Calendar, AlertCircle, Loader2 } from "lucide-react";
import { useGenerateInvite } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export default function Invitations() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const generateInviteMutation = useGenerateInvite();

  const [invites, setInvites] = useState([
    { id: "inv_1", code: "ABCD-EFGH-IJKL", uses: 0, max_uses: 1, expires_at: "2026-04-01", role: "user" },
    { id: "inv_2", code: "XYZ1-2345-ABCD", uses: 5, max_uses: 10, expires_at: "2026-03-15", role: "admin" },
  ]);

  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleGenerate = async () => {
    try {
      const result = await generateInviteMutation.mutateAsync();
      if (result?.invite_token) {
        setInvites([{
          id: `inv_${Date.now()}`,
          code: result.invite_token,
          uses: 0,
          max_uses: 1,
          expires_at: "30 days",
          role: "user"
        }, ...invites]);
        toast({ title: t("invitations.inviteGenerated") });
      }
    } catch (err) {
      console.warn("Backend unavailable, simulating invite generation", err);
      const mockCode = Array.from({length: 3}, () => Math.random().toString(36).substring(2, 6).toUpperCase()).join('-');
      setInvites([{
        id: `inv_${Date.now()}`,
        code: mockCode,
        uses: 0,
        max_uses: 1,
        expires_at: "30 days",
        role: "user"
      }, ...invites]);
      toast({ title: t("invitations.mockInvite") });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t("invitations.title")}</h1>
          <p className="text-slate-400 text-sm mt-1">{t("invitations.subtitle")}</p>
        </div>
      </div>

      <div className="bg-[#151822] border border-white/5 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
          <Plus className="w-5 h-5 text-cyan-400" />
          {t("invitations.createNew")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">{t("invitations.expiresIn")}</label>
            <select className="w-full bg-[#0b0e14] border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50 appearance-none">
              <option value="1h">{t("invitations.1hour")}</option>
              <option value="24h">{t("invitations.24hours")}</option>
              <option value="7d">{t("invitations.7days")}</option>
              <option value="30d">{t("invitations.30days")}</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">{t("invitations.maxUses")}</label>
            <input type="number" defaultValue="1" className="w-full bg-[#0b0e14] border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">{t("invitations.role")}</label>
            <select className="w-full bg-[#0b0e14] border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50 appearance-none">
              <option value="user">{t("invitations.roleUser")}</option>
              <option value="admin">{t("invitations.roleAdmin")}</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={generateInviteMutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#0f1117] font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)] disabled:opacity-50"
            >
              {generateInviteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : t("invitations.generate")}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#151822] border border-white/5 rounded-xl overflow-hidden shadow-xl shadow-black/20">
        <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#1a1e2b]">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-400" />
            {t("invitations.activeInvitations")}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase border-b border-white/5 bg-[#151822]">
              <tr>
                <th className="px-6 py-4 font-semibold">{t("invitations.code")}</th>
                <th className="px-6 py-4 font-semibold">{t("invitations.uses")}</th>
                <th className="px-6 py-4 font-semibold">{t("invitations.expiresAt")}</th>
                <th className="px-6 py-4 font-semibold">{t("invitations.role")}</th>
                <th className="px-6 py-4 font-semibold text-right">{t("invitations.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#151822]">
              {invites.map((invite) => (
                <tr key={invite.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded border border-cyan-400/20">{invite.code}</span>
                      <button
                        onClick={() => copyToClipboard(invite.code)}
                        className="text-slate-500 hover:text-white transition-colors"
                        title={t("common.copy")}
                      >
                        {copied === invite.code ? <span className="text-emerald-500 text-xs font-medium">{t("common.copied")}</span> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 rounded-full"
                          style={{ width: `${(invite.uses / invite.max_uses) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs">{invite.uses} / {invite.max_uses}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {invite.expires_at}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded text-xs font-medium ${invite.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-white/5 text-slate-300 border border-white/10'}`}>
                      {invite.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-rose-400 hover:text-rose-300 text-sm font-medium transition-colors opacity-0 group-hover:opacity-100">
                      {t("invitations.revoke")}
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
