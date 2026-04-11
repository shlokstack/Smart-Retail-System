const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function fetchDashboardStats() {
  const res = await fetch(`${BASE_URL}/dashboard`);
  if (!res.ok) throw new Error(`Failed to fetch /dashboard (${res.status})`);
  return res.json();
}

export async function fetchAlerts() {
  const res = await fetch(`${BASE_URL}/alerts`);
  if (!res.ok) throw new Error(`Failed to fetch /alerts (${res.status})`);
  return res.json();
}

export type AlertsTrendPoint = { time: string; alerts: number };

export async function fetchAlertsTrend(): Promise<AlertsTrendPoint[]> {
  const res = await fetch(`${BASE_URL}/alerts-trend`);
  if (!res.ok) throw new Error(`Failed to fetch /alerts-trend (${res.status})`);
  return res.json();
}
