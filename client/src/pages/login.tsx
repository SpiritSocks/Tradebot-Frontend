import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Lock, Mail, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#151822]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center gap-3 text-cyan-400 font-bold text-2xl tracking-wide mb-8">
            <Activity className="w-8 h-8" />
            TradeBot
          </div>

          <h1 className="text-xl font-semibold text-white mb-2 text-center">Welcome Back</h1>
          <p className="text-slate-400 text-sm text-center mb-8">Sign in to access your historical analysis panel</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="email" 
                  required
                  placeholder="admin@tradebot.local"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#0b0e14] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-xs text-cyan-500 hover:text-cyan-400">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#0b0e14] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] mt-4">
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Need an account? <a href="/signup" className="text-cyan-500 hover:text-cyan-400 transition-colors">Use invitation code</a>
          </div>
        </div>
      </div>
    </div>
  );
}
