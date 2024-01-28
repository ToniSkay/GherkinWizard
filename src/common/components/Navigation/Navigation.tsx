import "./Navigation.scss";
import {NavigationLink} from "./components/NavigationLink/NavigationLink";
import {Path} from "enums";

export function Navigation() {
  return (
    <div className="navigation-menu animate__animated animate__fadeInLeft">
      <NavigationLink link={Path.Root} name="Home" />
      <NavigationLink link={Path.MyScenarios} name="My Scenarios" />
      <NavigationLink link={Path.CreateScenario} name="Create Scenario" />
    </div>
  );
}
