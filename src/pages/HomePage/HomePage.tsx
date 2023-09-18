import "./HomePage.scss";
import "animate.css";
import { HomeButtons } from "./components/HomeButtons/HomeButtons";

export function HomePage() {
  const description =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in";

  return (
    <div className="home">
      <div className="animate__animated animate__fadeInUp">
        <div className={"content"}>
          <h1 className="home-header">Welcome!</h1>

          <p className="description">{description}</p>
        </div>

        <div className={"buttons"}>
          <HomeButtons></HomeButtons>
        </div>
      </div>
    </div>
  );
}
