import "./Login.scss";
import {NavigationLink} from "../../Navigation/components/NavigationLink/NavigationLink";
import {Path} from "../../../enums/index";

export function Login() {
  return (
    <div className="login animate__animated animate__fadeInRight">
      <NavigationLink link={Path.Login} name={"Login"} />
    </div>
  );
}
