import "./HomeButtons.scss";
import {useNavigate} from "react-router-dom";
import {Path} from "enums";

export function HomeButtons() {
  const navigate = useNavigate();

  return (
    <div className="home-buttons">
      <label onClick={() => navigate(Path.CreateScenario)}>Create Scenario</label>
      <label onClick={() => navigate(Path.MyScenarios)}>See My Scenarios</label>
    </div>
  );
}
