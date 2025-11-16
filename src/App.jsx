import React, { useState, useEffect } from "react";

const PERIODS = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
];

export default function App() {
  const [period, setPeriod] = useState("weekly");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`http://localhost:3000/api/time?period=${period}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Не удалось загрузить данные");
      })
      .finally(() => setLoading(false));
  }, [period]);

  return (
    <div className="dashboard">
      <h1 className="title">Time Tracking Dashboard</h1>

      <div className="period-switcher">
        {PERIODS.map((p) => (
          <button
            key={p.id}
            className={p.id === period ? "btn active" : "btn"}
            onClick={() => setPeriod(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}

      <div className="cards">
        {data.map((item) => (
          <div key={item.title} className="card">
            <h2>{item.title}</h2>
            <p>Current: {item.current}hrs</p>
            <p>Previous: {item.previous}hrs</p>
          </div>
        ))}
      </div>
    </div>
  );
}
