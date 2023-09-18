import "./Navigation.scss";
import { NavigationLink } from "./components/NavigationLink/NavigationLink";

export function Navigation() {
  return (
    <div className="navigation-menu animate__animated animate__fadeInLeft">
      <NavigationLink link="/" name="Home" />
      <NavigationLink link="/all-tasks" name="My Scenarios" />
      <NavigationLink link="/create-screnario" name="Create Scenario" />
    </div>
  );
}
