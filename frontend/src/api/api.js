const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getDashboardSummary() {
  const res = await fetch(`${BASE_URL}/dashboard/summary`);
  return res.json();
}

export async function getLivePositions() {
  const res = await fetch(`${BASE_URL}/dashboard/live-positions`);
  return res.json();
}

export async function addLivePosition(data) {
  const res = await fetch(`${BASE_URL}/dashboard/live-positions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function closePosition(symbol) {
  const res = await fetch(
    `${BASE_URL}/dashboard/live-positions/${symbol}/close`,
    { method: "PUT" }
  );
  return res.json();
}

export async function getBrokers() {
  const res = await fetch(`${BASE_URL}/brokers`);
  return res.json();
}

export async function getStrategies() {
  const res = await fetch(`${BASE_URL}/strategies`);
  return res.json();
}
