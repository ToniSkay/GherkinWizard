import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import "./RegistrationPage.scss";
import { NavigationLink } from "../../common/components/Navigation/components/NavigationLink/NavigationLink";
import axios from "axios";
import { finalize, from } from "rxjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: uuidv4(),
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setLoading] = useState(false);

  const register = () => {
    setLoading(true);
    from(axios.post("https://localhost:7167/create-user", data))
      .pipe(finalize(() => setLoading(false)))
      .subscribe(() => {
        navigate("/login");
      });
  };

  return (
    <div className="registration-page">
      <Card className={"registration-card animate__animated animate__flipInX"}>
        <p className={"backToLogin"}>
          <ArrowLeftOutlined rev />
          <NavigationLink link={"/login"} name={"Back to login"} />
        </p>

        <div className="form">
          <h3>Register new account!</h3>

          <div className={"registration-form-container"}>
            <Input
              type="email"
              onChange={({ target }) =>
                setData({ ...data, email: target.value })
              }
              className={"registration-input"}
              placeholder={"Enter email"}
            />
            <Input
              type="text"
              onChange={({ target }) =>
                setData({ ...data, name: target.value })
              }
              className={"registration-input"}
              placeholder={"Enter name"}
            />
            <Input
              type="password"
              onChange={({ target }) =>
                setData({ ...data, password: target.value })
              }
              className={"registration-input"}
              placeholder={"Enter password"}
            />
          </div>

          <Button
            loading={isLoading}
            onClick={register}
            className={"submit"}
            type="primary"
          >
            Register
          </Button>
        </div>
      </Card>
    </div>
  );
};
