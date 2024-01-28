import {ArrowLeftOutlined} from "@ant-design/icons";
import {Button, Card, Form, Input} from "antd";
import "./RegistrationPage.scss";
import {NavigationLink} from "components";
import axios from "axios";
import {finalize, from} from "rxjs";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {nanoid} from "nanoid";
import {Path} from "enums";
import {useFormItemConfigs} from "./hooks/use-form-items-config";

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const [, name, password, email] = useFormItemConfigs();

  const register = () => {
    form.validateFields().then(() => {
      setLoading(true);

      from(axios.post("https://localhost:7167/create-user", form.getFieldsValue()))
          .pipe(finalize(() => setLoading(false)))
          .subscribe(() => navigate(Path.Login))
      });
  }

  return (
    <div className="registration-page">
      <Card className={"registration-card animate__animated animate__flipInX"}>
        <p className={"backToLogin"}>
          <ArrowLeftOutlined rev={nanoid()} />
          <NavigationLink link={Path.Login} name={"Back to login"} />
        </p>

        <div className="form">
          <h3>Register new account!</h3>

          <div className={"registration-form-container"}>
            <Form form={form}>
              <Form.Item label="Name" {...name}>
                <Input
                    type="text"
                    className={"registration-input"}
                    placeholder={"Enter name"}
                />
              </Form.Item>

              <Form.Item label="Email" {...email}>
                <Input
                    type="email"
                    className={"registration-input"}
                    placeholder={"Enter email"}
                />
              </Form.Item>

              <Form.Item label="Password" {...password}>
                <Input
                    type="password"
                    className={"registration-input"}
                    placeholder={"Enter password"}
                />
              </Form.Item>
            </Form>
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
