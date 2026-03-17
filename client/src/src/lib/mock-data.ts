export const defaultRuns = [
  { id: "run_8f72a", created_at: "2026-03-09 10:23", market: "BINANCE / SPOT / BTCUSDT", interval: "15m", period: "2025-01-01 to 2026-01-01", status: "done", pnl: "+14.5%", trades: 142 },
  { id: "run_3b91c", created_at: "2026-03-09 09:15", market: "BYBIT / LINEAR / ETHUSDT", interval: "1h", period: "2025-06-01 to 2026-01-01", status: "running", pnl: "...", trades: "..." },
  { id: "run_1a44e", created_at: "2026-03-08 18:40", market: "OKX / SPOT / SOLUSDT", interval: "5m", period: "2025-10-01 to 2026-01-01", status: "failed", pnl: "-", trades: "-" },
  { id: "run_9c22d", created_at: "2026-03-08 14:20", market: "BINANCE / SPOT / BTCUSDT", interval: "1d", period: "2020-01-01 to 2026-01-01", status: "done", pnl: "+125.2%", trades: 843 },
];

export const getMockRuns = () => {
  const saved = localStorage.getItem("mock_runs");
  if (saved) return JSON.parse(saved);
  localStorage.setItem("mock_runs", JSON.stringify(defaultRuns));
  return defaultRuns;
};

export const addMockRun = (run: any) => {
  const runs = getMockRuns();
  runs.unshift(run);
  localStorage.setItem("mock_runs", JSON.stringify(runs));
};
