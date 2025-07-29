import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function DetailPage() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    fetchCrewmate();
  }, []);

  async function fetchCrewmate() {
    const { data } = await supabase
      .from("crewmates")
      .select("*")
      .eq("id", id)
      .single();
    setCrewmate(data);
  }

  if (!crewmate) return <p>Loading...</p>;

  return (
    <div>
      <h1>{crewmate.name}</h1>
      <p>Role: {crewmate.role}</p>
      <Link to={`/crewmate/${id}/edit`}>Edit Crewmate</Link>
    </div>
  );
}
