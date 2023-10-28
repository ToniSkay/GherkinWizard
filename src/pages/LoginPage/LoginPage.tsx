import "./LoginPage.scss";
import {Button, Card, Input} from "antd";
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {finalize, from} from "rxjs";
import {useUserStore} from "../../common/stores/user-store";
import {environment} from "../../environments/index";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const setCurrentUser = useUserStore((state) => state.setUser);

  const [isLoading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    from(
      axios.post(
        `${environment.baseApiUrl}Authentication/authenticate`,
        credentials,
      ),
    )
      .pipe(finalize(() => setLoading(false)))
      .subscribe(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        attachToken();
        setCurrentUser(data);
        navigate("/");
      });
  };

  const attachToken = () => {
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization =  JSON.parse(localStorage.getItem("user")).token;

      return config;
    });
  }

  return (
    <div className="login-page">
      <Card className={"login-card animate__animated animate__flipInX"}>
        <div className="form">
          <h3>Sign in to your account</h3>

          <div className={"input-container"}>
            <Input
              type="email"
              onChange={({ target }) =>
                setCredentials({ ...credentials, email: target.value })
              }
              className={"login-input"}
              placeholder={"Enter email"}
            />
            <Input
              type="password"
              onChange={({ target }) =>
                setCredentials({ ...credentials, password: target.value })
              }
              className={"login-input"}
              placeholder={"Enter password"}
            />
          </div>

          <Button
            loading={isLoading}
            onClick={() => login()}
            className={"submit"}
            type="primary"
          >
            Sign In
          </Button>
          <p>
            No account?{" "}
            <NavLink title="Registration" to={"/registration"}>
              Go to registration!
            </NavLink>
          </p>
        </div>
      </Card>
    </div>
  );
};
