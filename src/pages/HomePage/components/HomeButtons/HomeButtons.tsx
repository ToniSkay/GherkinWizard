import "./HomeButtons.scss";
import {useNavigate} from "react-router-dom";

export function HomeButtons() {
  const navigate = useNavigate();

  return (
    <div className="home-buttons">
      <label onClick={() => navigate("/create-scenario")}>Create Scenario</label>
      <label onClick={() => navigate("/all-tasks")}>See My Scenarios</label>
    </div>
  );
}
