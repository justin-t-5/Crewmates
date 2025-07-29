import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function SummaryPage() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  async function fetchCrewmates() {
    setLoading(true);
    setErrorMsg(null);
    const { data, error } = await supabase
      .from("crewmates")
      .select("*")
      .order("created_at", { ascending: false });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      console.error("Fetch error:", error);
      return;
    }
    setCrewmates(data);
  }
return (
  <div className="container">
    <h1>Crewmates Summary</h1>
    <button onClick={fetchCrewmates} disabled={loading}>
      {loading ? "Loading..." : "Refresh List"}
    </button>
    {errorMsg && <p className="error-message">Error: {errorMsg}</p>}
    {!loading && crewmates.length === 0 && <p>No crewmates found.</p>}
    <ul>
      {crewmates.map((c) => (
        <li key={c.id}>
          <a href={`/crewmate/${c.id}`}>
            {c.name} - <em>{c.role}</em>
          </a>
          <a href={`/crewmate/${c.id}/edit`} style={{ marginLeft: "1rem" }}>
            Edit
          </a>
        </li>
      ))}
    </ul>
  </div>
);

}
