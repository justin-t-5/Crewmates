import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    getCrewmate();
  }, []);

  async function getCrewmate() {
    const { data } = await supabase.from("crewmates").select("*").eq("id", id).single();
    setName(data.name);
    setRole(data.role);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    await supabase.from("crewmates").update({ name, role }).eq("id", id);
    navigate("/");
  }

  async function handleDelete() {
    await supabase.from("crewmates").delete().eq("id", id);
    navigate("/");
  }

  return (
    <div>
      <h1>Edit Crewmate</h1>
      <form onSubmit={handleUpdate}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Engineer">Engineer</option>
          <option value="Pilot">Pilot</option>
          <option value="Medic">Medic</option>
        </select>
        <button type="submit">Update</button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: "10px" }}>
          Delete
        </button>
      </form>
    </div>
  );
}
