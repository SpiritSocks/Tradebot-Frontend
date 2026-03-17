import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight } from 'lucide-react';

const Landing = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="flex items-center justify-center gap-3 text-cyan-400 font-bold text-4xl tracking-wide">
                    <Activity className="w-12 h-12" />
                    Торговый робот
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                    Современный <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                        Анализ Рынка
                    </span>
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <button onClick={() => navigate('/login')} className="flex items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                        Войти в аккаунт <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="absolute bottom-8 text-slate-500 text-sm">
                &copy; Копирайт Тёмыча
            </div>
        </div>
    );
};

export default Landing;