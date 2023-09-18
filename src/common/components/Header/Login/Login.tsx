import "./Login.scss";
import { NavigationLink } from "../../Navigation/components/NavigationLink/NavigationLink";

export function Login() {
  return (
    <div className="login animate__animated animate__fadeInRight">
      <NavigationLink link={"/login"} name={"Login"} />
    </div>
  );
}
