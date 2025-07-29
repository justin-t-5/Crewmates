import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase.from("crewmates").insert([{ name, role }]);

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      console.error("Insert error:", error);
      return;
    }
    // Successfully added, navigate to summary page
    navigate("/");
  }

return (
  <div className="container">
    <h1>Create Crewmate</h1>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={loading}
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        disabled={loading}
      >
        <option value="">Select Role</option>
        <option value="Engineer">Engineer</option>
        <option value="Pilot">Pilot</option>
        <option value="Medic">Medic</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Crewmate"}
      </button>
    </form>
    {errorMsg && <p className="error-message">{errorMsg}</p>}
  </div>
);

}
