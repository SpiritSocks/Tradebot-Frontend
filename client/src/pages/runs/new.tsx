import { useState, useEffect } from "react";
import { Plus, Trash2, ArrowRight, Settings2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useExchanges, useSymbols, useDetectors } from "@/lib/api-client";
import { addMockRun } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const NewRun = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [exchange, setExchange] = useState("bybit");
  const [category, setCategory] = useState("linear");
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [interval, setInterval] = useState("1");
  const [priceType, setPriceType] = useState("0");
  const [feesEnabled, setFeesEnabled] = useState(false);

  const [detectors, setDetectorsList] = useState([{ id: 1, code: "MA_CROSS", label: "Moving Average" }]);

  const { data: exchangesData, isLoading: loadingExchanges } = useExchanges();
  const { data: symbolsData, isLoading: loadingSymbols } = useSymbols(exchange, category);
  const { data: detectorsData, isLoading: loadingDetectors } = useDetectors();

  const currentExchangeObj = exchangesData?.exchanges?.find(e => e.code === exchange);
  const availableCategories = currentExchangeObj?.categories || ["linear", "spot"];
  const availableIntervals = currentExchangeObj?.intervals || ["1", "5", "15", "60", "D"];
  const availablePriceTypes = currentExchangeObj?.price_types || ["0", "1", "2", "3"];

  useEffect(() => {
    if (currentExchangeObj && !availableCategories.includes(category)) {
      setCategory(availableCategories[0] || "linear");
    }
    if (currentExchangeObj && !availableIntervals.includes(interval)) {
      setInterval(availableIntervals[0] || "1");
    }
  }, [exchange, currentExchangeObj, category, interval, availableCategories, availableIntervals]);

  const addDetector = () => setDetectorsList([...detectors, { id: Date.now(), code: "", label: "" }]);
  const removeDetector = (id: number) => setDetectorsList(detectors.filter(d => d.id !== id));
  const updateDetector = (id: number, field: string, value: string) => {
    setDetectorsList(detectors.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRun = {
      id: `run_${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString().slice(0, 16).replace('T', ' '),
      market: `${exchange.toUpperCase()} / ${category.toUpperCase()} / ${symbol.toUpperCase()}`,
      interval: interval + (['D','W','M'].includes(interval) ? '' : 'm'),
      period: "2026-01-01 to 2026-02-01",
      status: "queued",
      pnl: "-",
      trades: "-"
    };

    addMockRun(newRun);
    toast({ title: t("newRun.runQueued") });
    navigate("/runs");
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">{t("newRun.title")}</h1>
        <p className="text-slate-400 text-sm mt-1">{t("newRun.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#151822] border border-white/5 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white flex items-center gap-3 mb-6">
            <span className="w-7 h-7 rounded-md bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs border border-cyan-500/20">1</span>
            {t("newRun.marketSelection")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">{t("newRun.exchange")}</label>
              {loadingExchanges ? (
                <div className="h-11 flex items-center text-slate-500"><Loader2 className="w-4 h-4 animate-spin mr-2"/> {t("common.loading")}</div>
              ) : (
                <select
                  value={exchange}
                  onChange={(e) => setExchange(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none
                  focus:border-cyan-500/50 appearance-none capitalize"
                >
                  {exchangesData?.exchanges?.map(e => (
                    <option key={e.code} value={e.code}>{e.code}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">{t("newRun.category")}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none
                focus:border-cyan-500/50 appearance-none capitalize"
              >
                {availableCategories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">{t("newRun.symbol")}</label>
              {loadingSymbols ? (
                <div className="h-11 flex items-center text-slate-500"><Loader2 className="w-4 h-4 animate-spin mr-2"/> {t("common.loading")}</div>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder={t("newRun.symbolPlaceholder")}
                    list="symbols-list"
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none
                    focus:border-cyan-500/50 placeholder:text-slate-600 uppercase"
                  />
                  <datalist id="symbols-list">
                    {symbolsData?.symbols?.map(s => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#151822] border border-white/5 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white flex items-center gap-3 mb-6">
            <span className="w-7 h-7 rounded-md bg-purple-500/10 text-purple-400 flex items-center justify-center text-xs border
            border-purple-500/20">2</span>
            {t("newRun.dataParameters")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">{t("newRun.interval")}</label>
              <select
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none
                focus:border-purple-500/50 appearance-none"
              >
                {availableIntervals.map(inv => (
                  <option key={inv} value={inv}>{inv}{['D','W','M'].includes(inv) ? '' : 'm'}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">{t("newRun.priceType")}</label>
              <select
                value={priceType}
                onChange={(e) => setPriceType(e.target.value)}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none
                focus:border-purple-500/50 appearance-none"
              >
                {availablePriceTypes.map(pt => (
                  <option key={pt} value={pt}>
                    {pt === "0" ? t("newRun.priceClose") : pt === "1" ? t("newRun.priceOpen") : pt === "2" ? t("newRun.priceHigh") : pt === "3" ? t("newRun.priceLow") : pt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">{t("newRun.fromDate")}</label>
              <input
                type="datetime-local"
                defaultValue="2026-01-01T00:00"
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none
                focus:border-purple-500/50 scheme-dark"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">{t("newRun.toDate")}</label>
              <input
                type="datetime-local"
                defaultValue="2026-02-01T00:00"
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none
                focus:border-purple-500/50 scheme-dark"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#151822] border border-white/5 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-3">
              <span className="w-7 h-7 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs border
              border-amber-500/20">3</span>
              {t("newRun.detectors")}
            </h2>
            <button
              type="button"
              onClick={addDetector}
              className="text-sm flex items-center gap-1.5 text-amber-400 hover:text-amber-300 bg-amber-400/10 border
              border-amber-400/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" /> {t("newRun.addDetector")}
            </button>
          </div>

          {loadingDetectors ? (
            <div className="flex justify-center p-8 text-slate-500"><Loader2 className="w-6 h-6 animate-spin mr-2"/> {t("newRun.loadingDetectors")}</div>
          ) : (
            <div className="space-y-4">
              {detectors.map((detector, index) => (
                <div key={detector.id} className="p-5 rounded-xl border border-white/5 bg-background/50 relative group">
                  {detectors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDetector(detector.id)}
                      className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100
                      transition-opacity bg-white/5 p-1.5 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 pr-8">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-400">{t("newRun.detectorCode")}</label>
                      <select
                        value={detector.code}
                        onChange={(e) => updateDetector(detector.id, "code", e.target.value)}
                        className="w-full bg-[#151822] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200
                        focus:outline-none focus:border-amber-500/50 appearance-none"
                      >
                        <option value="" disabled>{t("newRun.selectDetector")}</option>
                        {detectorsData?.detectors?.map(d => (
                          <option key={d.code} value={d.code}>{d.description || d.code}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-400">{t("newRun.labelOptional")}</label>
                      <input
                        type="text"
                        value={detector.label}
                        onChange={(e) => updateDetector(detector.id, "label", e.target.value)}
                        placeholder={t("newRun.labelPlaceholder")}
                        className="w-full bg-[#151822] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200
                        focus:outline-none focus:border-amber-500/50 placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {detector.code && (
                    <div className="p-4 bg-[#151822] rounded-lg border border-white/5">
                      <div className="flex items-center gap-2 mb-3 text-xs font-medium text-amber-400/80 uppercase tracking-wider">
                        <Settings2 className="w-3.5 h-3.5" /> {t("newRun.configOptions")}
                      </div>

                      {detector.code === "MA_CROSS" && (
                        <div className="grid grid-cols-2 gap-4 animate-in fade-in">
                          <div>
                            <label className="text-xs text-slate-500 mb-1.5 block">{t("newRun.shortPeriod")}</label>
                            <input type="number" defaultValue={9} className="w-full bg-background border border-white/5 rounded-md
                            px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50" />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 mb-1.5 block">{t("newRun.longPeriod")}</label>
                            <input type="number" defaultValue={21} className="w-full bg-background border border-white/5 rounded-md
                            px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50" />
                          </div>
                        </div>
                      )}

                      {detector.code === "RSI" && (
                        <div className="grid grid-cols-3 gap-4 animate-in fade-in">
                          <div>
                            <label className="text-xs text-slate-500 mb-1.5 block">{t("newRun.periodLabel")}</label>
                            <input type="number" defaultValue={14} className="w-full bg-background border border-white/5 rounded-md
                            px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50" />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 mb-1.5 block">{t("newRun.overbought")}</label>
                            <input type="number" defaultValue={70} className="w-full bg-background border border-white/5 rounded-md
                            px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50" />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 mb-1.5 block">{t("newRun.oversold")}</label>
                            <input type="number" defaultValue={30} className="w-full bg-background border border-white/5 rounded-md
                            px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-amber-500/50" />
                          </div>
                        </div>
                      )}

                      {detector.code !== "MA_CROSS" && detector.code !== "RSI" && (
                        <div className="text-sm text-slate-500 italic">{t("newRun.noConfigOptions")}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {detectors.length === 0 && (
                <div className="text-center py-8 text-slate-500 border border-dashed border-white/10 rounded-xl bg-white/1">
                  {t("newRun.noDetectorsAdded")}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-[#151822] border border-white/5 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">{t("newRun.tradingFees")}</h2>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={feesEnabled} onChange={(e) => setFeesEnabled(e.target.checked)} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${feesEnabled ? 'bg-cyan-500' : 'bg-white/10'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${feesEnabled ?
                  'transform translate-x-4' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm font-medium text-slate-300">{t("newRun.enableCustomFees")}</span>
            </label>
          </div>

          {feesEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 pt-6 border-t border-white/5 animate-in slide-in-from-top-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">{t("newRun.makerFee")}</label>
                <input type="number" step="0.01" defaultValue="0.02" className="w-full bg-background border border-white/10
                rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">{t("newRun.takerFee")}</label>
                <input type="number" step="0.01" defaultValue="0.05" className="w-full bg-background border border-white/10
                rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500/50" />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <button type="submit" className="flex items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400
          hover:to-blue-500 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]
          hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
            {t("newRun.startRun")}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewRun;
